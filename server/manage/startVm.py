import subprocess

def startVm(uuid=''):
	cmd = 'VBoxManage startvm ' + uuid;
	if len(uuid) == 0:
		return '需要uuid或者name'
	else:
		endStatus = subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE)
		return endStatus