# Python

python을 공부하는 동안 정리해 놓는 저장소 입니다.

01. import error 

<h1>Python import error</h1>
일단 저는 코린이입니다. 이제 강의 수강을 시작했고 하면서 막혔던 부분을 다른 설명이나 지식없이 해결한 부분이라 넓은 아량으로 읽어 주셨으면 감사하겠습니다. 막혔던 부분 다른 분들도 격게 되실때 해결하시는데 도움이 되고자 남깁니다.

<h2>Error</h2>

![](https://velog.velcdn.com/images/littleduck/post/84221420-e764-4e2e-96cc-0a393123a066/image.png)

첫 줄에 numpy나 requests등 import 했을때 발생하는 에러이다 아나콘다나 python이 최신 버전으로 깔려있고 pip install로 이미 설치를 했음에도 나타난다.
인터넷에 검색하여 여러 사이트나 블로그를 확인하면 대부분 interpreter 인터프리터경로를 재설정하라고 한다.


![](https://velog.velcdn.com/images/littleduck/post/f40e45cb-5ef0-4196-a780-3230696403cf/image.png)

이렇게나 많다..

하나씩 다 해봤지만 안되고 하나씩 바꾸고 껏다키고 뭔짓을 해도 안됫다....

어쩔수 없이 구글 코랩으로 작성하고 깃허브에 올릴려고 다시 깃허브 폴더로 옮겨놓으면 또 안되고 미치겠었는데

새벽까지 끝까지 찾아서 드디어 해결방법을 찾았다....

VScode에서 JSON에서 코드를 추가하면되는데 무슨 뜻인지 아직 잘 모릅니다. 하지만 추가 하는 것만으로 해결이 되었으므로

제가 스스로 찾아서 해결했다는 것에 의의를 두고 있습니다. 언젠가 무슨 의미인지 알게되는 날이 오길...

<h2>해결법</h2>
<p>command를 호출하고</p>

![](https://velog.velcdn.com/images/littleduck/post/4cf996f5-2ffe-4061-a143-e3f1712c255d/image.png)

<p>language specific setting 검색</p>

![](https://velog.velcdn.com/images/littleduck/post/796be107-36fa-4830-911d-12c8abee1007/image.png)
<p>python 검색</p>

![](https://velog.velcdn.com/images/littleduck/post/6f8c590d-cf2c-40d8-a3bd-ec7647239990/image.png)

<p>setting.json에서</p>

![](https://velog.velcdn.com/images/littleduck/post/24c2835d-f3bd-477c-80c5-44d6763619af/image.png)

이 코드들을 문법에 잘 맞게 입력하면 된다.


```
"python.autoComplete.extraPaths": [
    "./path-to-your-code"
  ],
  "python.envFile": ".env",
  "python.languageServer": "Jedi",
  "python.analysis.disabled": [
    "unresolved-import"
  ],
  "python.linting.pylintArgs": [
    "--load-plugin",
    "pylint_protobuf"
  ]
```

미숙한 영어실력으로 stack overflow에서 긁어 온것입니다. 관련된 글들을 읽고 이것저것 수집해 왔습니다.

저처럼 고생하지 마시길 바랍니다...

해결 잘되시길 바라고 화이팅입니다!