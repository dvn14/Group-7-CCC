echo "ansible_check: start"
ansible --version
echo "ansible_check: done"

echo "Deployment: start"

# Spin up main server

. ./openrc.sh; ansible-playbook -i hosts --ask-become-pass mrc.yaml

echo "Spin up complete"
#echo -e "\n[main_server]" >> ./hosts

# python3 ./boto/CreateInstance.py | grep -Po '(\d{1,3}\.){3}\d{1,3}' >> ./ansible/hosts

# echo "Harvester server created."