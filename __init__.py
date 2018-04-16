from flask import *

# 获取vbox数据的方法
from server.manage.getVmList import getVmList

app = Flask(__name__)

@app.route("/")
def index():
	return render_template("index.html")

# vm 全部列表
@app.route("/vmlist")
def get_vmlist():
	vmlist = getVmList();
	lenN = len(vmlist)
	return render_template('vmlist.html',vmlist=vmlist,lenN=lenN,running=False)
# vm 运行列表
@app.route("/runningVmList")
def get_running_vmlist():
	vmlist = getVmList(True);
	lenN = len(vmlist)
	return render_template("vmlist.html",vmlist=vmlist,lenN=lenN,running=True)

if __name__ == '__main__':
	app.run(host="0.0.0.0",debug=True)