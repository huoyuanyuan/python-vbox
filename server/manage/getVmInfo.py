import subprocess
import re

def getVmInfo(name):
	cmd = "VBoxManage showvminfo " + name + " -machinereadable"
	if len(name) == 0:
		return '需要uuid或者name'
	else:
		p = subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE)
		out,err = p.communicate()
		out = bytes.decode(out)
		infoList = {}
		if len(out) > 0:
			for line in out.splitlines():
				arr = re.split("=",line);
				key = arr[0]
				val = arr[1]
				infoList[key] = val
		return infoList