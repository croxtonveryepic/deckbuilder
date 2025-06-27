import re
filename = '02-broken-pair.ts'
readfile = list(open(filename, 'r'))
writefile = open(filename, 'w')
# print(readfile)

for line in readfile:
  # print(line)
  match = re.search('subtype: (.*),', line)
  if match is not None:
    writefile.write('subtype: [' + '\', \''.join(match.group(1).split(' ')) + '],\n')
  else:
    writefile.write(line)

writefile.close()