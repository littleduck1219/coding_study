# _*_*_coding:utf-8 _*_*_
def solution(s):
    print("[s] " + s)
    listLenZipS = []  # 압축 문자열의 길이를 저장하는 변수.
    listS = [] # 분리된 문자열을 저장하는 변수.
    # n : 분리할 문자열의 길이를 지정하는 변수.
    # 분리할 문자열의 길이(n)를 지정하는 반복문.
    for n in range(1, len(s)+1):
        pieceS = ""  # 분리할 문자열을 임시 지정하는 변수.
        cntN = 0  # 분리할 문자 길이의 도달 여부 확인용 변수.
        # 문자열을 n개씩 분리하는 반복문.
        for k in range(len(s)):
            pieceS += s[k]
            cntN += 1
            if (n == cntN) | (k == len(s)-1):
                listS.append(pieceS)
                pieceS = ""
                cntN = 0
        print(listS)

        zipS = ""  # 압축된 문자열을 저장하는 변수.
        cntDup = 1  # 죽복 횟수 기록용 변수.
        # 문자열을 압축하는 반복문.
        for k in range(len(listS)):
            # k+1 경계 점검.
            if k+1 > len(listS)-1:
                if cntDup == 1:
                    cntDup = ""
                zipS += str(cntDup) + listS[k]
                break
            # 인접 및 중복 여부 비교.
            if listS[k] == listS[k+1]:
                cntDup += 1
                # 중복 종료 시 저장.
            else:
                if cntDup == 1:
                    cntDup = ""
                zipS += str(cntDup) + listS[k]
                cntDup = 1

            print(zipS)
            listLenZipS.append(len(zipS))
            listS = []


    print(listLenZipS)
    print(min(listLenZipS))
    return min(listLenZipS)

if __name__ == "__main__":
    solution("aabbaccc")
