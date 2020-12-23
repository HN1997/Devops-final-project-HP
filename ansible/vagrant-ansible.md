##  Attempt to set the the application with vagrant coupled with ansible

# Initial steps
* We first re-read the class and made the lab associated to it 
* Then the expplication course on vagrant and ansible respective web-sites
* We then looked online for a way to install redis using ansible and vagrant 

# First attempt setting up redis
* Ansible provided a smal playbook to set it up https://www.ansibletutorials.com/installing-redis
* We, based on the script of the lab implemented it
* not forgeting to put the application folder in the vagrant folder for it to be synced
* also setting the ports to be forwarded to be able to access the application from the host 
* saddly an error occured when the handle was suppose to run 
* This handle was suppose to let redis restart with the right settings so it wasn't going to work 
* after several attempt we switched to another github folder

# Second attempt
* We found a git hub allowing to set up redis using both https://github.com/mikeblum/redis-playbook 
* it was using bento/ubuntu-16.04 
* It allowed (in quite a long time ~15-25min) to set redis with a password and a conf file 
* it was using ansible on the host machine so we changed it to ansible-local as in the lab
* Redis was finaly installed using an ssh session we tried to make the application run by cloning the repository
* installing npm and the running npm install and start 
* but during the installation a lot of errors showed up as follow
WARN engine @eslint/eslintrc@0.2.2: wanted: {"node":"^10.12.0 || >=12.0.0"} (curloadDep:v8-compile-cache
* even after asking specificaly to get the latest version of node and npm there was no way to make it work

# Third attempt 
* after that we tried to use a different os and switched to ubuntu/xenial64
* after multiple attempt nothing changed

# Fourth attempt 
* We then tried to find another way (hopefully simpler) to set up redis
* we came accross the code for ansible-galaxy of the geerlingguy (which seems to be quite renoned for his ansible playbooks)
* using a basic vm initiated by vagrant we managed using ssh to make the ansible-galaxy run 
* then we tried to set up npm but the same problem were showing up as previously
* we were still using ubuntu/xenial64 and we switch back to centos/7
* The problems remained 

# Fifth attempt 
* After setting up redis with ansible galaxy througth ssh we tried to use NVM to force the version of npm
* we managed to force the version to 14.15.1
* with this version we were able to start the application 
* so we had running both redis and the application at the same time on the vm but weren't using a premade ansible playbook
* We documented every step we took and tried to convert it into an ansible playbook
* After a day of transcripting nothing seemed to be working 
* We had errors with selecting the host, and actually starting the tasks 
* Even the instalation of nvm wasn't working 
* after several days on the task we decided to switch to other requested tasks