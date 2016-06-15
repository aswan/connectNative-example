#!/usr/bin/env python

import struct, sys, tempfile, subprocess, os, json

def read():
    rawlen = sys.stdin.read(4)
    if len(rawlen) == 0:
        sys.exit(0)
    msglen = struct.unpack('@I', rawlen)[0]
    msg = sys.stdin.read(msglen)
    return json.loads(msg)

def write(msg):
    encmsg = json.dumps(msg)
    sys.stdout.write(struct.pack('@I', len(encmsg)))
    sys.stdout.write(encmsg)
    sys.stdout.flush()

while True:
    body = read()

    path = tempfile.mktemp()
    fp = open(path, 'w')
    fp.write(body)
    fp.close()

    subprocess.call(["open", "-nWa", "/Applications/Emacs.app", path])

    fp = open(path, 'r')
    body = fp.read()
    fp.close

    os.remove(path)

    write(body)
