import 'dart:convert';
import 'dart:io';
import 'dart:math';

void main() {
  // 1. 유저 입력을 받아서 출력하기
  print('가위, 바위, 보 중 하나를 입력해 주세요');
  String userInput = stdin.readLineSync(encoding: utf8) ?? "Error";

  // 2. 랜덤으로 가위, 바위, 보 중 하나를 출력하기
  const selectList = ['가위', '바위', '보'];
  final cpuInput = selectList[Random().nextInt(3)];
  print('컴퓨터: $cpuInput');

  // 3. 유저의 타입과 컴퓨터 타입에 대한 결과를 계산할 함수
  final result = getResult(userInput, cpuInput);
  print(result);
}

String getResult(String userInput, String cpuInput) {
  String result;

  switch (userInput) {
    case '가위':
      cpuInput == '가위'
          ? result = '비김'
          : cpuInput == '바위'
              ? result = '패배'
              : result = '승리';
    case '바위':
      cpuInput == '바위'
          ? result = '비김'
          : cpuInput == '보'
              ? result = '패배'
              : result = '승리';
    case '보':
      cpuInput == '보'
          ? result = '비김'
          : cpuInput == '가위'
              ? result = '패배'
              : result = '승리';
    default:
      result = 'Error';
  }
  return result;
}
