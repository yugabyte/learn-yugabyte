import requests
import base64
import os

learn_dir = requests.get('https://api.github.com/repos/YugaByte/yugabyte-db/contents/community/learn')
learn_dir = learn_dir.json()
index = 0
while learn_dir[index]['name'] != "content":
    index += 1
tree_sha = learn_dir[index]['sha']
print(tree_sha)
tree = requests.get('https://api.github.com/repos/YugaByte/yugabyte-db/git/trees/' + tree_sha + '?recursive=1')
tree = tree.json()['tree']

for item in tree:
    print(item['path'])
    if item['type'] == 'blob':
        content = requests.get('https://api.github.com/repos/YugaByte/yugabyte-db/contents/community/learn/content/' + item['path'])
        content = content.json()['content']
        with open("content/" + item['path'], "w") as f:
            f.write(base64.decodestring(content))