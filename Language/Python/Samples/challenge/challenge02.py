
def solution(p):
  if p == "":
    return ""



w = 
u = ""
v = ""
sliceW = ""
print("[2][w]" + w)

for k in range(len(w)):
  sliceW += w[k]
  if (sliceW.count("(")) == (sliceW.count(")")):
    u = sliceW
    v = w[k+1:]
    break
print("[2][u] " + u + " / [v] " + v)




if __name__ == "__main__":
  solution("()))((()")