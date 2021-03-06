import subprocess

def createVm(name,version,internalSize,memorySize):
	name1 = 'VirtualBox Host-Only Ethernet Adapter'
	name2 = 'Intel(R) Dual Band Wireless-AC 8265'
	adrs = 'vms/' + name + '.vdi'
	cmd = 'vBoxManage createvm -name ' + name + ' -ostype ' + version + ' -register'
	# 不设置网络连接
	# cmd2 = 'vBoxManage modifyvm '+ name +' --memory 512 --vram 64 --acpi on --boot1 dvd --nic1 hostonly --nic2 bridged'
	cmd2 = 'vBoxManage modifyvm '+ name +' --memory '+internalSize+' --vram '+memorySize+' --acpi on --boot1 dvd'
	cmd3 = 'vBoxManage createhd --filename "'+adrs+'" --size 5000'
	cmd4 = 'vBoxManage storagectl '+ name +' --name "IDE Controller" --add ide --bootable on'
	cmd5 = 'vBoxManage storageattach '+name+' --storagectl "IDE Controller" --port 0 --device 0 --type hdd --medium "'+adrs+'"'
	# cmd6 = 'vBoxManage modifyvm '+name+' --hostonlyadapter1 "'+ name1 +'" --bridgeadapter2 "' + name2 + '"'
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
			print("Subprogram success:1")
		else:
			print("Subprogram failed:1")

		p2 = subprocess.Popen(cmd2,shell=True,stdout=subprocess.PIPE)
		while p2.poll() is None:
			line = p2.stdout.readline()
			line = line.strip()
			if line:
				print('Subprogram output:[{}]'.format(line.decode('gbk')))
		if p2.returncode == 0:
			print("Subprogram success:2")
		else:
			print("Subprogram failed:2")
		
		p3 = subprocess.Popen(cmd3,shell=True,stdout=subprocess.PIPE)
		while p3.poll() is None:
			line = p3.stdout.readline()
			line = line.strip()
			if line:
				print('Subprogram output:[{}]'.format(line.decode('gbk')))
		if p3.returncode == 0:
			print("Subprogram success:3")
		else:
			print("Subprogram failed:3")

		p4 = subprocess.Popen(cmd4,shell=True,stdout=subprocess.PIPE)
		while p4.poll() is None:
			line = p4.stdout.readline()
			line = line.strip()
			if line:
				print('Subprogram output:[{}]'.format(line.decode('gbk')))
		if p4.returncode == 0:
			print("Subprogram success:4")
		else:
			print("Subprogram failed:4")

		p5 = subprocess.Popen(cmd5,shell=True,stdout=subprocess.PIPE)
		while p5.poll() is None:
			line = p5.stdout.readline()
			line = line.strip()
			if line:
				print('Subprogram output:[{}]'.format(line.decode('gbk')))
		if p5.returncode == 0:
			print("Subprogram success:5")
		else:
			print("Subprogram failed:5")

		# p6 = subprocess.Popen(cmd6,shell=True,stdout=subprocess.PIPE)
		# while p6.poll() is None:
		# 	line = p6.stdout.readline()
		# 	line = line.strip()
		# 	if line:
		# 		print('Subprogram output:[{}]'.format(line.decode('gbk')))
		# if p6.returncode == 0:
		# 	print("Subprogram success:6")
		# else:
		# 	print("Subprogram failed:6")
		return p5.returncode