import subprocess

def createVm(name,version):
	cmd = 'VBoxManage createvm -name ' + name + ' -ostype ' + version + ' -register';
	print(cmd)
	if len(name) == 0:
		return '需要 name'
	elif len(version) == 0:
		return '需要 version'
	else:
		p = subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE)
		while p.poll() is None:
			line = p.stdout.readline()
			line = line.strip()
			if line:
				print('Subprogram output:[{}]'.format(line.decode('gbk')))
		if p.returncode == 0:
			print("Subprogram success")
		else:
			print("Subprogram failed")
		return p.returncode