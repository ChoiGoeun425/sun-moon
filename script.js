/* ==========================================================
   월광마을
   사이트 02 - 해와 달 오누이
   초반 인트로 + 기억 조각 선택
========================================================== */


/* ==========================================================
   DOM
========================================================== */

const paintingArea = document.querySelector(".painting-area");
const painting = document.querySelector(".painting");
const paintingFull = document.querySelector(".painting-full");

const dialogueBox = document.querySelector(".dialogue-box");
const dialogueName = document.querySelector(".dialogue-name");
const dialogueText = document.querySelector(".dialogue-text");

const memorySelect = document.querySelector(".memory-select");
const memoryChoices = document.querySelectorAll(".memory-choice");

const picturePuzzle =
    document.querySelector("#picturePuzzle");

const comparisonAfter =
    document.querySelector("#comparisonAfter");

const comparisonSlider =
    document.querySelector("#comparisonSlider");

const puzzleAnswerInput =
    document.querySelector("#puzzleAnswerInput");

const puzzleAnswerButton =
    document.querySelector("#puzzleAnswerButton");

const puzzleError =
    document.querySelector("#puzzleError");

const puzzleAnswerArea =
    document.querySelector(".puzzle-answer-area");

const lightPuzzle =
    document.querySelector("#lightPuzzle");

const lightCanvas =
    document.querySelector("#lightCanvas");

const darkOverlay =
    document.querySelector("#darkOverlay");

const hiddenLightWord =
    document.querySelector(".hidden-light-word");

const lightCursor =
    document.querySelector("#lightCursor");

const lightNextButton =
    document.querySelector("#lightNextButton");

const lightPuzzleGuide =
    document.querySelector("#lightPuzzleGuide");

const lightAnswerArea =
    document.querySelector("#lightAnswerArea");

const lightAnswerInput =
    document.querySelector("#lightAnswerInput");

const lightAnswerButton =
    document.querySelector("#lightAnswerButton");

const lightAnswerError =
    document.querySelector("#lightAnswerError");

const footprintPuzzle =
    document.querySelector("#footprintPuzzle");

const footprintCanvas =
    document.querySelector("#footprintCanvas");

const footprintGuide =
    document.querySelector("#footprintGuide");

const cFootprints =
    document.querySelectorAll(".c-footprint");

const passwordOverlay =
    document.getElementById("passwordOverlay");

const passwordInput =
    document.getElementById("passwordInput");

const passwordButton =
    document.getElementById("passwordButton");

const passwordError =
    document.getElementById("passwordError");

/* ==========================================================
   검은 화면 요소
========================================================== */

const blackScene =
    document.querySelector(".black-scene");

const blackDialogueName =
    document.querySelector(".black-dialogue-name");

const blackDialogueText =
    document.querySelector(".black-dialogue-text");



/* ==========================================================
   개발 설정
========================================================== */

// 개발 중에는 true
// 완성 후 배포할 때 false

const DEV_MODE = true;


/* ==========================================================
   게임 상태
========================================================== */

let gameMode = "intro";
const completedMemories = new Set();

/* ==========================================================
   기억별 검은 화면 독백
========================================================== */

const blackDialogues = {

    A: [
        {
            text: "산을 지키는 존재."
        },

        {
            text: "그들에게서 나는."
        },

        {
            text: "■으로도, 신령으로도 불리었다."
        },

        {
            text: "아이는 그런 것을 개의치 않았다."
        }
    ],

    B: [
        {
            text: "말은 잘하지 못하였으나,"
        },

        {
            text: "자신의 이름만큼은 말할 줄 알았다."
        },


        {
            text: "우연."
        },

        {
            text: "그것이 아이가 처음 내뱉은 한마디였다."
        }
    ],

    C: [
        {
            text: "비가 오지 않았다."
        },

        {
            text: "마을은 점점 메말라갔다."
        },

        {
            text: "사람들은 하늘을 원망하였고,"
        },

        {
            text: "끝내 다른 것을 찾기 시작하였다."
        }
    ],

    D: [
        {
            text: "평소와 달리 웃지 않았다."
        },

        {
            text: "아이는 아무 말도 하지 않았다."
        },

        {
            text: "뒤에서 들려온 목소리가 아이를 붙잡았다."
        },

        {
            text: "“마을을 위해서라면, 어쩔 수 없는 일이다.”"
        }
    ],

    E: [
        {
            text: "인간의 욕심은 끝이 없다."
        },

        {
            text: "사사로운 이익에"
        },

        {
            text: "생명까지 내어놓을 정도로."
        },

        {
            text: "그러니, 그들은"
        },

        {
            text: "마땅히 벌을 받아야 했다."
        }
    ]

};

let currentBlackDialogues = [];
let blackDialogueIndex = 0;


/* ==========================================================
   검은 화면 독백 출력
========================================================== */

function showBlackDialogue() {

    const dialogue =
        currentBlackDialogues[blackDialogueIndex];

    if (!dialogue) {
        return;
    }

    blackDialogueName.textContent =
        dialogue.name || "";

    typeText(
        blackDialogueText,
        dialogue.text
    );

}


/* ==========================================================
   검은 화면 독백 시작
========================================================== */
function startBlackScene(memory) {

    gameMode = "black";

    currentBlackDialogues =
        blackDialogues[memory] || [];

    blackDialogueIndex = 0;


    /* ------------------------------------------
       이전 검은 화면 대사 초기화
    ------------------------------------------ */

    clearTimeout(typingTimer);

    isTyping = false;

    currentTypingText = "";
    currentTypingElement = null;

    blackDialogueName.textContent = "";
    blackDialogueText.textContent = "";


    /* ------------------------------------------
       새 검은 화면 표시
    ------------------------------------------ */

    blackScene.classList.add("show");


    /* ------------------------------------------
       잠시 후 새 대사 출력
    ------------------------------------------ */

    setTimeout(function () {

        showBlackDialogue();

    }, 800);

}

/* ==========================================================
   검은 화면 독백 진행
========================================================== */

/* ==========================================================
   검은 화면 독백 진행
========================================================== */

blackScene.addEventListener(
    "click",
    function () {

        if (finishTyping()) {
            return;
        }


        /* ------------------------------------------
           아직 다음 독백이 남아 있는 경우
        ------------------------------------------ */

        if (
            blackDialogueIndex <
            currentBlackDialogues.length - 1
        ) {

            blackDialogueIndex++;

            showBlackDialogue();

            return;
        }


        /* ------------------------------------------
           마지막 독백
        ------------------------------------------ */

        blackScene.classList.remove("show");


        /* ------------------------------------------
           E 독백은 여기서 종료
           → 붓질 연출로 돌아가지 않음
        ------------------------------------------ */

        if (
            currentBlackDialogues ===
            blackDialogues.E
        ) {

            console.log(
                "E 독백 종료 → 기억 장면 시작"
            );

            playMemoryScene();

            return;
        }


        /* ------------------------------------------
           A / B / C / D만
           기존 붓질 연출로 이동
        ------------------------------------------ */

        console.log(
            "기억 독백 종료:",
            selectedMemory
        );

        startPaintingReveal();

    }
);

/* ==========================================================
   인트로 대사
========================================================== */

const introDialogues = [

    {
        name: "김솔음",
        text: "……풍경이 달라졌다."
    },

    {
        name: "",
        text: "눈앞에 펼쳐진 것은 두 번째 그림과 동일한 한 폭의 수묵화였다."
    },

    {
        name: "",
        text: "산자락을 따라 나있는 길, 그리고 그 위로 보이는 바위들."
    },

    {
        name: "김솔음",
        text: "아직까지, 실종자들은 따로 보이지 않았어."
    },

    {
        name: "김솔음",
        text: "그림에 먹혔다는 것은 확실하지만...."
    },

    {
        name: "",
        text: "단서가 부족하다."
    }

];

let introIndex = 0;


/* ==========================================================
   글리치 이후 대사
========================================================== */

const afterGlitchDialogues = [

    {
        name: "김솔음",
        text: "……방금 그건."
    },

    {
        name: "김솔음",
        text: "분명 무언가가 보였는데."
    },

    {
        name: "",
        text: "순간적으로 지나간 풍경과 다르게 눈 앞은 처음 보았던 모습 그대로였다."
    },

    {
        name: "김솔음",
        text: "……그림이 보여주고 싶은 기억인가?"
    },

    {
        name: "김솔음",
        text: "그런 거라면, 확인해야겠지."
    }

];

let afterGlitchIndex = 0;


/* ==========================================================
   타이핑 효과
========================================================== */

let isTyping = false;
let typingTimer = null;

let currentTypingText = "";
let currentTypingElement = null;

let puzzleAnswer = "";
let selectedMemory = "";
let puzzleSolved = false;


function typeText(element, text, speed = 45) {

    clearTimeout(typingTimer);

    element.textContent = "";

    let index = 0;

    isTyping = true;

    currentTypingText = text;
    currentTypingElement = element;


    function typing() {

        if (index < text.length) {

            element.textContent += text.charAt(index);

            index++;

            typingTimer = setTimeout(typing, speed);

        } else {

            isTyping = false;

            currentTypingText = "";
            currentTypingElement = null;

        }

    }

    typing();

}


/* ==========================================================
   타이핑 즉시 완료
========================================================== */

function finishTyping() {

    if (!isTyping) {
        return false;
    }

    clearTimeout(typingTimer);

    if (currentTypingElement) {
        currentTypingElement.textContent = currentTypingText;
    }

    isTyping = false;

    currentTypingText = "";
    currentTypingElement = null;

    return true;
}


/* ==========================================================
   대사 출력
========================================================== */

function showDialogue(name, text) {

    dialogueName.textContent = name || "";

    typeText(
        dialogueText,
        text
    );

}


/* ==========================================================
   인트로 대사 출력
========================================================== */

function showIntroDialogue() {

    const dialogue =
        introDialogues[introIndex];

    if (!dialogue) {
        return;
    }

    showDialogue(
        dialogue.name,
        dialogue.text
    );

}


/* ==========================================================
   글리치 이후 대사 출력
========================================================== */

function showAfterGlitchDialogue() {

    const dialogue =
        afterGlitchDialogues[afterGlitchIndex];

    if (!dialogue) {
        return;
    }

    showDialogue(
        dialogue.name,
        dialogue.text
    );

}


/* ==========================================================
   인트로 시작
========================================================== */

function startIntro() {

    gameMode = "intro";

    introIndex = 0;

    paintingArea.classList.remove("ready");

    showIntroDialogue();

}


/* ==========================================================
   완성된 그림 글리치
========================================================== */

function startGlitch() {

    gameMode = "glitch";

    dialogueName.textContent = "";
    dialogueText.textContent = "";

    // 달이 있는 완성 그림에 글리치 적용
    paintingFull.classList.add("glitch");


    setTimeout(function () {

        paintingFull.classList.remove("glitch");

        gameMode = "afterGlitch";

        afterGlitchIndex = 0;

        showAfterGlitchDialogue();

    }, 900);

}


/* ==========================================================
   기억 조각 선택 화면
========================================================== */

function startReady() {

    gameMode = "memorySelect";

    dialogueName.textContent = "";
    dialogueText.textContent = "";

    dialogueBox.classList.remove("show");

    paintingArea.classList.remove("ready");


    /*
        완성 버전에서는 여기서
        localStorage에 이미 선택한 기억이 있는지
        확인할 수 있음.

        개발 중에는 DEV_MODE가 true이므로
        매번 선택 화면을 보여줌.
    */

    if (!DEV_MODE) {

        const savedMemory =
            localStorage.getItem("selectedMemory");


        if (savedMemory) {

            console.log(
                "이미 선택한 기억:",
                savedMemory
            );

            // 나중에 여기서
            // 저장된 기억으로 바로 진입

            return;
        }

    }


    memorySelect.classList.add("show");

}


/* ==========================================================
   기억 조각 선택
========================================================== */

/* ==========================================================
   기억 조각 선택
========================================================== */

memoryChoices.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const memory =
                button.dataset.memory;


            console.log(
                "선택한 기억:",
                memory
            );


            /*
                개발 모드가 아닐 때만
                선택한 기억을 저장
            */

            if (!DEV_MODE) {

                const savedMemory =
                    localStorage.getItem(
                        "selectedMemory"
                    );


                if (savedMemory) {
                    return;
                }


                localStorage.setItem(
                    "selectedMemory",
                    memory
                );

            }


            /*
                선택 화면 닫기
            */

            memorySelect.classList.remove("show");


            /*
                선택한 기억 저장
            */

            selectedMemory = memory;


            /*
                그림 비교 기믹 시작
            */

            startPicturePuzzle(
                selectedMemory
            );

        }
    );

});


/* ==========================================================
   페이지 로딩
========================================================== */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                dialogueBox.classList.add("show");

                startIntro();

            },
            5000
        );

    }
);


/* ==========================================================
   대화창 클릭
========================================================== */

dialogueBox.addEventListener(
    "click",
    function () {

        // 공통 루트는 별도의 클릭 핸들러가 처리
        if (gameMode === "commonRoute") {
            return;
        }
        /*
            타이핑 중이면
            클릭 한 번으로 문장 전체 출력
        */

        if (finishTyping()) {
            return;
        }


        /* ------------------------------------------------------
           인트로
        ------------------------------------------------------ */

        if (gameMode === "intro") {

            if (
                introIndex <
                introDialogues.length - 1
            ) {

                introIndex++;

                showIntroDialogue();

            } else {

                // 인트로 종료 → 글리치

                startGlitch();

            }

            return;
        }


        /* ------------------------------------------------------
           글리치 중
        ------------------------------------------------------ */

        if (gameMode === "glitch") {

            return;

        }


        /* ------------------------------------------------------
           글리치 이후 대사
        ------------------------------------------------------ */

        if (gameMode === "afterGlitch") {

            if (
                afterGlitchIndex <
                afterGlitchDialogues.length - 1
            ) {

                afterGlitchIndex++;

                showAfterGlitchDialogue();

            } else {

                // 후속 대사 종료
                // → 기억 선택 화면

                startReady();

            }

            return;
        }

        if (gameMode === "commonRoute") {

            // 타이핑 중이면 첫 클릭으로 문장 완성
            if (finishTyping()) {
                return;
            }

            // 실제 다음 대사 진행은
            // startCommonRoute()의 핸들러에서 처리

            return;
        }

    }
);

/* ==========================================================
   그림 비교 기믹 시작
========================================================== */

/* ==========================================================
   그림 비교 기믹
========================================================== */

function startPicturePuzzle(memory) {

    // B는 별도의 빛 기믹으로 진행
    if (memory === "B") {
        startLightPuzzle();
        return;
    }

    // C는 발자국 기믹
    if (memory === "C") {

        startFootprintPuzzle();

        return;
    }

    if (memory === "D") {

        startDPuzzle();

        return;
    }


    console.log(
        "그림 비교 시작:",
        memory
    );


    gameMode = "picturePuzzle";

    selectedMemory = memory;

    puzzleSolved = false;

    /*
        임시 정답
        나중에 실제 정답으로 변경
    */

    if (memory === "A") {

        puzzleAnswer = "달";

    }

    else if (memory === "B") {



        puzzleAnswer = "나무";

    }

    else if (memory === "C") {

        puzzleAnswer = "발자국";

    }

    else if (memory === "D") {

        puzzleAnswer = "마을";

    }


    /*
        비교 화면 초기화
    */

    comparisonSlider.value = 20;

    comparisonAfter.style.width = "20%";

    puzzleAnswerInput.value = "";

    puzzleError.textContent = "";


    /*
        그림 비교 화면 표시
    */

    picturePuzzle.classList.add("show");


    console.log(
        "picturePuzzle 표시 완료"
    );

}

/* ==========================================================
   B 기억 - 빛 기믹
========================================================== */

/* ==========================================================
   B 기억 - 손전등 기믹 시작
========================================================== */

function startLightPuzzle() {

    console.log("B - 손전등 기믹 시작");

    gameMode = "lightPuzzle";

    selectedMemory = "B";

    puzzleSolved = false;


    /*
        초기화
    */

    hiddenLightWord.style.opacity = "1";

    lightNextButton.classList.remove("show");

    lightPuzzleGuide.textContent =
        "손전등을 움직여 숨겨진 글자를 찾아보세요.";


    /*
        손전등 초기 위치
    */

    darkOverlay.style.setProperty(
        "--light-x",
        "50%"
    );

    darkOverlay.style.setProperty(
        "--light-y",
        "50%"
    );

    lightCursor.style.left = "50%";
    lightCursor.style.top = "50%";


    /*
        화면 표시
    */

    lightPuzzle.classList.add("show");

    lightAnswerArea.classList.remove("show");

    lightAnswerInput.value = "";

    lightAnswerError.textContent = "";

}

/* ==========================================================
   그림 비교 정답 확인
========================================================== */

puzzleAnswerButton.addEventListener(
    "click",
    function () {

        const answer =
            puzzleAnswerInput.value.trim();


        if (!answer) {

            puzzleError.textContent =
                "정답을 입력하세요.";

            return;

        }


        if (answer === puzzleAnswer) {

            puzzleSolved = true;

            puzzleError.textContent = "";

            finishPicturePuzzle();

        }

        else {

            puzzleError.textContent =
                "……무언가 다른 것 같다.";

            puzzleAnswerInput.value = "";

            puzzleAnswerInput.focus();

        }

    }
);

/* ==========================================================
   그림 비교 슬라이더
========================================================== */

comparisonSlider.addEventListener(
    "input",
    function () {

        const value =
            comparisonSlider.value;


        comparisonAfter.style.width =
            value + "%";

    }
);

/* ==========================================================
   그림 비교 기믹 종료
========================================================== */

/* ==========================================================
   그림 비교 기믹 종료
========================================================== */

function finishPicturePuzzle() {

    if (selectedMemory === "A") {

        picturePuzzle.innerHTML = `
            <div class="moon-clue">

                <div class="moon-clue-image">
                    <img src="images/A.png"
                         alt="기억의 그림">

                    <div class="moon-symbol">
                        月
                    </div>
                </div>

                <div class="moon-clue-text">
                    ……그림 속에 무언가가 떠오른다.
                </div>

                <button type="button" id="clueNextButton">
                    다음
                </button>

            </div>
        `;

        // 잠깐 기다린 뒤 月 등장
        setTimeout(function () {

            const moonSymbol =
                document.querySelector(".moon-symbol");

            if (moonSymbol) {
                moonSymbol.classList.add("show");
            }

        }, 300);

        document
            .getElementById("clueNextButton")
            .addEventListener("click", function () {

                picturePuzzle.classList.remove("show");

                console.log("단서 확인 완료");

                startBlackScene("A");
            });

    } else {

        picturePuzzle.classList.remove("show");

        console.log(
            "기억 비교 성공:",
            selectedMemory
        );
    }
}



/* ==========================================================
   손전등 시작
========================================================== */

lightCanvas.addEventListener(
    "pointerdown",
    function (event) {

        if (gameMode !== "lightPuzzle") return;

        event.preventDefault();

        isLightMoving = true;

        lightCanvas.setPointerCapture(
            event.pointerId
        );

        moveLight(event);

    }
);

/* ==========================================================
   B 기억 - 손전등 움직이기
========================================================== */

let isLightMoving = false;


/* 손전등 누르기 */

lightCanvas.addEventListener(
    "pointerdown",
    function (event) {

        if (gameMode !== "lightPuzzle") return;

        isLightMoving = true;

        lightCanvas.setPointerCapture(
            event.pointerId
        );

        moveLight(event);
    }
);


/* 손전등 움직이기 */

lightCanvas.addEventListener(
    "pointermove",
    function (event) {

        if (!isLightMoving) return;

        moveLight(event);
    }
);


/* 손전등 놓기 */

lightCanvas.addEventListener(
    "pointerup",
    function () {

        isLightMoving = false;

    }
);


lightCanvas.addEventListener(
    "pointercancel",
    function () {

        isLightMoving = false;

    }
);


/* ==========================================================
   손전등 위치 계산
========================================================== */

function moveLight(event) {

    const rect =
        lightCanvas.getBoundingClientRect();


    let x =
        event.clientX - rect.left;

    let y =
        event.clientY - rect.top;


    /*
        손전등이 그림 밖으로 나가지 않게 제한
    */

    x = Math.max(
        0,
        Math.min(rect.width, x)
    );

    y = Math.max(
        0,
        Math.min(rect.height, y)
    );


    /*
        검은 막의 구멍 위치
    */

    const xPercent =
        (x / rect.width) * 100;

    const yPercent =
        (y / rect.height) * 100;


    darkOverlay.style.setProperty(
        "--light-x",
        xPercent + "%"
    );

    darkOverlay.style.setProperty(
        "--light-y",
        yPercent + "%"
    );


    /*
        손전등 테두리 위치
    */

    lightCursor.style.left =
        x + "px";

    lightCursor.style.top =
        y + "px";


    /*
        글자를 제대로 비췄는지 확인
    */

    checkLightPosition(x, y);
}

/* ==========================================================
   빛 발견
========================================================== */

function revealLightClue() {

    if (puzzleSolved) return;


    puzzleSolved = true;


    hiddenLightWord.style.opacity = "1";

}

/* ==========================================================
   B 정답 확인
========================================================== */

/* ==========================================================
   B 정답 확인
========================================================== */

function checkLightAnswer() {

    const answer =
        lightAnswerInput.value.trim();


    if (answer === "빛") {

        puzzleSolved = true;

        lightAnswerError.style.color =
            "#fff";


        /*
            잠깐 정답 표시 후
            바로 다음 장면으로 이동
        */

        setTimeout(function () {

            lightPuzzle.classList.remove("show");

            showLightClue();

        }, 400);

    }

    else {

        lightAnswerError.textContent =
            "아직 제대로 보이지 않는다.";

    }

}


/* ==========================================================
   확인 버튼
========================================================== */

lightAnswerButton.addEventListener(
    "click",
    function () {

        checkLightAnswer();

    }
);


/* ==========================================================
   Enter 키로 정답 확인
========================================================== */

lightAnswerInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            checkLightAnswer();

        }

    }
);

function checkLightPosition(x, y) {

    if (puzzleSolved) return;


    const wordX =
        lightCanvas.clientWidth * 0.70;

    const wordY =
        lightCanvas.clientHeight * 0.35;


    const distance =
        Math.sqrt(
            Math.pow(x - wordX, 2) +
            Math.pow(y - wordY, 2)
        );


    /*
        글자 전체가 손전등 안에 들어왔을 때
    */

    if (distance <= 40) {

        lightAnswerArea.classList.add("show");

        lightPuzzleGuide.textContent =
            "……무언가가 보인다.";

    }

}

/* ==========================================================
   B - 光 단서 등장
========================================================== */

function showLightClue() {

    picturePuzzle.innerHTML = `
        <div class="moon-clue">

            <div class="moon-clue-image">

                <img
                    src="images/B.png"
                    alt="기억의 그림"
                >

                <div class="moon-symbol">
                    光
                </div>

            </div>


            <div class="moon-clue-text">
                ……그림 속에 무언가가 떠오른다.
            </div>


            <button
                type="button"
                id="clueNextButton"
            >
                다음
            </button>

        </div>
    `;


    /*
        잠깐 기다린 뒤 光 등장
    */

    setTimeout(function () {

        const lightSymbol =
            document.querySelector(".moon-symbol");

        if (lightSymbol) {

            lightSymbol.classList.add("show");

        }

    }, 300);


    /*
        다음 버튼
    */

    document
        .getElementById("clueNextButton")
        .addEventListener(
            "click",
            function () {

                picturePuzzle.classList.remove(
                    "show"
                );

                console.log(
                    "B 光 단서 확인 완료"
                );

                startBlackScene("B");

            }
        );


    /*
        단서 화면 표시
    */

    picturePuzzle.classList.add("show");

}

/* ==========================================================
   C 기억 - 발자국 기믹 시작
========================================================== */

let currentFootprintStep = 1;

function startFootprintPuzzle() {
    console.log("C - 발자국 기믹 시작");

    gameMode = "footprintPuzzle";
    selectedMemory = "C";
    puzzleSolved = false;

    currentFootprintStep = 1;

    /*
        발자국 요소들을 매번 새로 검색해서 5개 모두 확실하게 인식
    */
    const footprints = document.querySelectorAll(".c-footprint");

    /*
        발자국 초기화
    */
    footprints.forEach(function (footprint) {
        footprint.classList.remove("found");
        footprint.classList.remove("current");
    });

    /*
        첫 번째 발자국 표시
    */
    const firstFootprint = document.querySelector(
        '.c-footprint[data-step="1"]'
    );

    if (firstFootprint) {
        firstFootprint.classList.add("current");
    }

    if (footprintGuide) {
        footprintGuide.textContent = "호랑이 발치에서 시작된 흔적이 보인다.";
    }

    /*
        화면 표시
    */
    if (footprintPuzzle) {
        footprintPuzzle.classList.add("show");
    }
}

/* ==========================================================
   C 발자국 클릭 (5단계 완주 적용)
========================================================== */

document.querySelectorAll(".c-footprint").forEach(function (footprint) {
    footprint.addEventListener("click", function (event) {
        event.preventDefault();

        const step = Number(footprint.dataset.step);

        /*
            현재 순서가 아니면 아무 일도 일어나지 않음
        */
        if (step !== currentFootprintStep) {
            return;
        }

        /*
            현재 발자국 발견 및 자국 고정
        */
        footprint.classList.remove("current");
        footprint.classList.add("found");

        /*
            1 ~ 4번째 발자국을 클릭했을 때 -> 다음 발자국 열어주기
        */
        if (currentFootprintStep < 5) {
            currentFootprintStep++;

            const nextFootprint = document.querySelector(
                `.c-footprint[data-step="${currentFootprintStep}"]`
            );

            if (nextFootprint) {
                nextFootprint.classList.add("current");
            }

            // 가이드 문구 변경
            if (footprintGuide) {
                if (currentFootprintStep === 3) {
                    footprintGuide.textContent = "……발자국이 나무를 향해 오른다.";
                } else if (currentFootprintStep === 5) {
                    footprintGuide.textContent = "……흔적이 높은 하늘과 달을 향한다.";
                } else {
                    footprintGuide.textContent = "……흔적이 이어진다.";
                }
            }
        }
        /*
            5번째 발자국을 클릭했을 때 -> 비로소 종료 연출 실행
        */
        else {
            if (footprintGuide) {
                footprintGuide.textContent = "……흔적이 높은 하늘과 달까지 이어졌다.";
            }

            setTimeout(function () {
                finishFootprintPuzzle();
            }, 2500);
        }
    });
});

/* ==========================================================
   C 발자국 완료
========================================================== */

function finishFootprintPuzzle() {

    puzzleSolved = true;


    footprintGuide.textContent =
        "……마지막 흔적이다.";


    setTimeout(
        function () {

            footprintPuzzle.classList.remove(
                "show"
            );

            show幽Clue();

        },
        500
    );

}

/* ==========================================================
   C - 幽 단서 등장
========================================================== */

function show幽Clue() {

    picturePuzzle.innerHTML = `
        <div class="moon-clue">

            <div class="moon-clue-image">

                <img
                    src="images/C.png"
                    alt="기억의 그림"
                >

                <div class="moon-symbol">
                    幽
                </div>

            </div>


            <div class="moon-clue-text">
                ……기억 속에 한 글자가 남는다.
            </div>


            <button
                type="button"
                id="clueNextButton"
            >
                다음
            </button>

        </div>
    `;


    /*
        단서 화면 표시
    */

    picturePuzzle.classList.add(
        "show"
    );


    /*
        잠깐 기다린 뒤 幽 등장
    */

    setTimeout(
        function () {

            const hiddenCharacter =
                document.querySelector(
                    ".moon-symbol"
                );

            if (hiddenCharacter) {

                hiddenCharacter.classList.add(
                    "show"
                );

            }

        },
        300
    );


    /*
        다음 버튼
    */

    document
        .getElementById(
            "clueNextButton"
        )
        .addEventListener(
            "click",
            function () {

                picturePuzzle.classList.remove(
                    "show"
                );

                console.log(
                    "C 幽 단서 확인 완료"
                );

                startBlackScene("C");

            }
        );

}

/* ==========================================================
   C 발자국 클릭 로직 업데이트
========================================================== */

/* ==========================================================
   C 발자국 클릭 로직 - 5단계 완주 후 완료
========================================================== */

cFootprints.forEach(function (footprint) {
    footprint.addEventListener("click", function (event) {
        event.preventDefault();

        const step = Number(footprint.dataset.step);

        // 현재 눌러야 하는 순서가 아니면 무시
        if (step !== currentFootprintStep) {
            return;
        }

        // 1. 현재 클릭한 발자국 선명하게 고정
        footprint.classList.remove("current");
        footprint.classList.add("found");

        // 2. 5번째(마지막) 발자국을 누른 경우 -> 바로 퍼즐 완료 처리
        if (currentFootprintStep === 5) {
            footprintGuide.textContent = "……흔적이 높은 하늘과 달까지 이어졌다.";

            // 약간의 여운을 주고 단서 획득 연출로 이동
            setTimeout(function () {
                finishFootprintPuzzle();
            }, 2500);
            return;
        }

        // 3. 아직 다음 발자국이 남은 경우 -> 다음 단계 준비
        currentFootprintStep++;

        const nextFootprint = document.querySelector(
            `.c-footprint[data-step="${currentFootprintStep}"]`
        );

        if (nextFootprint) {
            nextFootprint.classList.add("current");
        }

        // 가이드 텍스트 변경
        if (currentFootprintStep === 3) {
            footprintGuide.textContent = "……발자국이 나무를 향해 오른다.";
        } else if (currentFootprintStep === 5) {
            footprintGuide.textContent = "……흔적이 높은 하늘과 달을 향한다.";
        } else {
            footprintGuide.textContent = "……흔적이 이어진다.";
        }
    });
});

/* ==========================================================
   D 기억 - 수묵 지우개 (어둡게 연출 보완 버전)
========================================================== */

let isDrawing = false;
let erasedPercent = 0;
let dPuzzleFinished = false;

function startDPuzzle() {
    console.log("D - 수묵 지우개 기믹 시작");

    gameMode = "dPuzzle";
    selectedMemory = "D";
    puzzleSolved = false;
    dPuzzleFinished = false;

    // 이전 화면 및 퍼즐 정리
    const memorySelect = document.getElementById("memorySelect");
    if (memorySelect) memorySelect.classList.remove("show");

    const paintingArea = document.querySelector(".painting-area");
    if (paintingArea) paintingArea.classList.remove("ready");

    const allPuzzles = document.querySelectorAll(
        "#comparePuzzle, #flashlightPuzzle, #footprintPuzzle"
    );
    allPuzzles.forEach(function (p) {
        if (p) p.classList.remove("show");
    });

    // D 퍼즐 섹션 표시
    const dPuzzleSection = document.getElementById("dPuzzle");
    if (dPuzzleSection) dPuzzleSection.classList.add("show");

    // 배경 이미지/글자 클래스 초기화
    const bgImg = document.querySelector(".d-bg-img");
    const villageChar = document.getElementById("hiddenVillageChar");
    if (bgImg) bgImg.classList.remove("clear");
    if (villageChar) villageChar.classList.remove("clear");

    const dGuide = document.getElementById("dPuzzleGuide");
    if (dGuide) dGuide.textContent = "칠흑 같은 먹물을 문질러 숨겨진 기억을 씻어내세요.";

    requestAnimationFrame(() => {
        const canvas = document.getElementById("inkCanvas");
        const container = document.getElementById("dCanvasContainer");
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");

        canvas.width = container.clientWidth || 360;
        canvas.height = container.clientHeight || 510;

        canvas.style.opacity = "1";
        canvas.style.transition = "none";

        // ★ 거의 완전한 칠흑(99% 불투명도)으로 캔버스 덮기
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(5, 5, 5, 0.99)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 거친 먹자국 번짐 연출
        for (let i = 0; i < 25; i++) {
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 50 + 20,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();
        }

        function erase(x, y) {
            if (dPuzzleFinished) return;

            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 26, 0, Math.PI * 2); // 지우개 크기
            ctx.fill();

            checkErasedAmount(ctx, canvas);
        }

        // 마우스 & 터치 이벤트
        canvas.onmousedown = (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            erase(e.clientX - rect.left, e.clientY - rect.top);
        };

        canvas.onmousemove = (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            erase(e.clientX - rect.left, e.clientY - rect.top);
        };

        window.onmouseup = () => { isDrawing = false; };

        canvas.ontouchstart = (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            erase(touch.clientX - rect.left, touch.clientY - rect.top);
        };

        canvas.ontouchmove = (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            erase(touch.clientX - rect.left, touch.clientY - rect.top);
        };

        canvas.ontouchend = () => { isDrawing = false; };
    });
}

function checkErasedAmount(ctx, canvas) {

    if (dPuzzleFinished) return;


    /* ======================================================
       村 글자의 실제 판정점

       360 × 510 캔버스 기준

       각 점 주변이 지워졌는지를 검사한다.
    ====================================================== */

    const targetPoints = [

        // 세로 획
        { x: 260, y: 125 },
        { x: 260, y: 145 },
        { x: 260, y: 165 },
        { x: 260, y: 185 },
        { x: 260, y: 205 },

        // 가로 획
        { x: 235, y: 155 },
        { x: 250, y: 155 },
        { x: 270, y: 155 },
        { x: 285, y: 155 },

        // 왼쪽 부분
        { x: 235, y: 175 },
        { x: 245, y: 195 },

        // 오른쪽 부분
        { x: 280, y: 175 },
        { x: 290, y: 195 }
    ];


    /* ======================================================
       각 판정점 주변이 얼마나 지워졌는지 검사
    ====================================================== */

    let clearedPoints = 0;


    targetPoints.forEach(function (point) {

        const radius = 8;

        const startX =
            Math.max(0, Math.floor(point.x - radius));

        const startY =
            Math.max(0, Math.floor(point.y - radius));

        const width =
            Math.min(
                radius * 2,
                canvas.width - startX
            );

        const height =
            Math.min(
                radius * 2,
                canvas.height - startY
            );


        if (width <= 0 || height <= 0) {
            return;
        }


        const imageData =
            ctx.getImageData(
                startX,
                startY,
                width,
                height
            );

        const pixels = imageData.data;

        let transparent = 0;
        let total = 0;


        for (let i = 3; i < pixels.length; i += 4) {

            total++;

            if (pixels[i] === 0) {
                transparent++;
            }
        }


        const percent =
            (transparent / total) * 100;


        /*
            이 지점 주변의 70% 이상이
            지워졌으면 해당 획을 찾은 것으로 판정
        */

        if (percent >= 70) {
            clearedPoints++;
        }
    });


    /* ======================================================
       전체 글자 중 얼마나 찾았는지
    ====================================================== */

    const foundPercent =
        (clearedPoints / targetPoints.length) * 100;


    const dGuide =
        document.getElementById("dPuzzleGuide");


    /* ------------------------------------------------------
       일부 발견
    ------------------------------------------------------ */

    if (
        foundPercent >= 20 &&
        foundPercent < 60
    ) {

        if (dGuide) {
            dGuide.textContent =
                "……먹물 아래에 무언가가 숨어 있다.";
        }
    }


    /* ------------------------------------------------------
       대부분 발견
    ------------------------------------------------------ */

    else if (
        foundPercent >= 60 &&
        foundPercent < 90
    ) {

        if (dGuide) {
            dGuide.textContent =
                "……글자의 형태가 조금씩 드러난다.";
        }
    }


    /* ======================================================
       ★ 글자의 90% 이상을 찾았을 때만 성공
    ====================================================== */

    else if (
        foundPercent >= 90 &&
        !dPuzzleFinished
    ) {

        dPuzzleFinished = true;


        if (dGuide) {
            dGuide.textContent =
                "……숨겨진 글자가 모습을 드러낸다.";
        }


        /* 먹물 페이드아웃 */

        canvas.style.transition =
            "opacity 1.2s ease";

        canvas.style.opacity = "0";


        /* 村 등장 */

        const bgImg =
            document.querySelector(".d-bg-img");

        const villageChar =
            document.getElementById(
                "hiddenVillageChar"
            );


        if (bgImg) {
            bgImg.classList.add("clear");
        }


        if (villageChar) {
            villageChar.classList.add("clear");
        }


        /* 잠시 후 단서 화면 */

        setTimeout(function () {

            finishDPuzzle();

        }, 1800);
    }
}

function finishDPuzzle() {
    puzzleSolved = true;
    showClueModal("村"); // 마지막 단서 '村' 지급
}

/* ==========================================================
   D - 村 단서 등장
========================================================== */

function showClueModal(character) {

    picturePuzzle.innerHTML = `
        <div class="moon-clue">

            <div class="moon-clue-image">

                <img
                    src="images/D.png"
                    alt="기억의 그림"
                >

                <div class="moon-symbol">
                    ${character}
                </div>

            </div>


            <div class="moon-clue-text">
                ……그림 속에 무언가가 떠오른다.
            </div>


            <button
                type="button"
                id="clueNextButton"
            >
                다음
            </button>

        </div>
    `;


    /*
        단서 화면 표시
    */

    picturePuzzle.classList.add("show");


    /*
        잠깐 기다린 뒤 村 등장
    */

    setTimeout(function () {

        const hiddenCharacter =
            document.querySelector(".moon-symbol");

        if (hiddenCharacter) {

            hiddenCharacter.classList.add("show");

        }

    }, 300);


    /*
        다음 버튼
    */

    document
        .getElementById("clueNextButton")
        .addEventListener(
            "click",
            function () {

                picturePuzzle.classList.remove(
                    "show"
                );

                console.log(
                    "D 村 단서 확인 완료"
                );

                startBlackScene("D");

            }
        );

}

/* ==========================================================
   공통 루트 - 수묵화 붓질 등장 연출
========================================================== */

/* ==========================================================
   공통 루트 - 수묵화 붓질 등장 연출
========================================================== */

/* ==========================================================
   공통 루트 - 수묵화 붓질 등장 연출
========================================================== */

/* ==========================================================
   공통 루트 - SVG 붓질 등장 연출
========================================================== */

function startPaintingReveal() {

    const commonRoute =
        document.getElementById("commonRoute");

    const paintingReveal =
        document.getElementById("paintingReveal");

    const paintingArea =
        document.getElementById("paintingArea");

    const commonImageWrap =
        document.querySelector(
            ".common-route-image-wrap"
        );


    if (
        !commonRoute ||
        !paintingReveal
    ) {
        startCommonRoute();
        return;
    }


    gameMode = "paintingReveal";


    /* ======================================================
       기존 그림 숨기기
    ====================================================== */

    if (paintingArea) {
        paintingArea.style.display = "none";
    }

    if (commonImageWrap) {
        commonImageWrap.style.display = "none";
    }


    /* ======================================================
       공통 루트 표시
    ====================================================== */

    commonRoute.classList.add("show");


    /* ======================================================
       기존 연출 삭제
    ====================================================== */

    paintingReveal.innerHTML = "";


    /* ======================================================
       SVG 생성
    ====================================================== */

    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    svg.classList.add(
        "painting-mask-svg"
    );

    svg.setAttribute(
        "viewBox",
        "0 0 390 585"
    );


    /* ======================================================
       DEF
    ====================================================== */

    const defs =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
        );


    const mask =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "mask"
        );

    mask.setAttribute(
        "id",
        "paintingBrushMask"
    );

    mask.setAttribute(
        "maskUnits",
        "userSpaceOnUse"
    );

    mask.setAttribute(
        "x",
        "0"
    );

    mask.setAttribute(
        "y",
        "0"
    );

    mask.setAttribute(
        "width",
        "390"
    );

    mask.setAttribute(
        "height",
        "585"
    );


    /* ======================================================
       검은 배경
       
       처음에는 그림이 전혀 보이지 않음
    ====================================================== */

    const black =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
        );

    black.setAttribute(
        "x",
        "0"
    );

    black.setAttribute(
        "y",
        "0"
    );

    black.setAttribute(
        "width",
        "390"
    );

    black.setAttribute(
        "height",
        "585"
    );

    black.setAttribute(
        "fill",
        "black"
    );


    mask.appendChild(
        black
    );


    defs.appendChild(
        mask
    );

    svg.appendChild(
        defs
    );


    paintingReveal.appendChild(
        svg
    );


    /* ======================================================
       그림
    ====================================================== */

    const painting =
        document.createElement("img");

    painting.src =
        "images/D.png";

    painting.alt =
        "월광마을 수묵화";

    painting.className =
        "painting-reveal-image";


    /*
        SVG mask를 직접 연결
    */

    painting.style.webkitMaskImage =
        "url(#paintingBrushMask)";

    painting.style.maskImage =
        "url(#paintingBrushMask)";


    paintingReveal.appendChild(
        painting
    );


    /* ======================================================
       붓질 경로
       
       390 × 585 기준
       
       각 경로가 실제 붓이 지나가는 방향
    ====================================================== */

    const brushStrokes = [

        /* ----------------------------------------------
           1. 위쪽 산
        ---------------------------------------------- */

        {
            path:
                "M -30 95 " +
                "C 50 70, " +
                "110 110, " +
                "175 88 " +
                "C 235 67, " +
                "305 105, " +
                "420 78",

            width: 82
        },


        /* ----------------------------------------------
           2. 위쪽 산 두 번째 붓질
        ---------------------------------------------- */

        {
            path:
                "M -20 135 " +
                "C 60 115, " +
                "125 145, " +
                "205 125 " +
                "C 270 108, " +
                "330 140, " +
                "410 118",

            width: 58
        },


        /* ----------------------------------------------
           3. 중앙 산
        ---------------------------------------------- */

        {
            path:
                "M 420 205 " +
                "C 350 185, " +
                "305 220, " +
                "240 200 " +
                "C 170 180, " +
                "100 215, " +
                "-30 190",

            width: 78
        },


        /* ----------------------------------------------
           4. 중앙 나무 / 산
        ---------------------------------------------- */

        {
            path:
                "M -30 270 " +
                "C 55 245, " +
                "120 280, " +
                "190 255 " +
                "C 250 235, " +
                "325 275, " +
                "420 250",

            width: 72
        },


        /* ----------------------------------------------
           5. 중앙 아래쪽
        ---------------------------------------------- */

        {
            path:
                "M 420 330 " +
                "C 330 305, " +
                "275 345, " +
                "205 320 " +
                "C 135 295, " +
                "70 335, " +
                "-30 310",

            width: 82
        },


        /* ----------------------------------------------
           6. 산길
        ---------------------------------------------- */

        {
            path:
                "M -30 390 " +
                "C 60 360, " +
                "120 405, " +
                "200 380 " +
                "C 270 358, " +
                "330 400, " +
                "420 375",

            width: 88
        },


        /* ----------------------------------------------
           7. 아래쪽
        ---------------------------------------------- */

        {
            path:
                "M 420 465 " +
                "C 330 440, " +
                "280 475, " +
                "205 450 " +
                "C 125 425, " +
                "65 470, " +
                "-30 445",

            width: 75
        },


        /* ----------------------------------------------
           8. 마지막 붓질
        ---------------------------------------------- */

        {
            path:
                "M -30 535 " +
                "C 65 505, " +
                "130 545, " +
                "205 520 " +
                "C 280 495, " +
                "335 540, " +
                "420 515",

            width: 95
        }

    ];


    /* ======================================================
       붓질 생성
    ====================================================== */

    const paths = [];


    brushStrokes.forEach(
        function (stroke, index) {

            const path =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );


            path.setAttribute(
                "d",
                stroke.path
            );

            path.setAttribute(
                "stroke",
                "white"
            );

            path.setAttribute(
                "fill",
                "none"
            );

            path.setAttribute(
                "stroke-width",
                stroke.width
            );

            path.setAttribute(
                "stroke-linecap",
                "round"
            );

            path.setAttribute(
                "stroke-linejoin",
                "round"
            );


            /*
                실제 경로 길이
            */

            const length =
                path.getTotalLength();


            path.style.strokeDasharray =
                length;

            path.style.strokeDashoffset =
                length;


            /*
                약간씩 다른 붓 느낌
            */

            if (index % 3 === 0) {

                path.style.strokeWidth =
                    stroke.width + 12;

            }


            mask.appendChild(
                path
            );


            paths.push(path);

        }
    );


    /* ======================================================
       연출 시작
    ====================================================== */

    paintingReveal.classList.add(
        "show"
    );


    /* ======================================================
       붓질 애니메이션
    ====================================================== */

    paths.forEach(
        function (path, index) {

            setTimeout(
                function () {

                    const length =
                        path.getTotalLength();


                    path.style.transition =
                        "stroke-dashoffset " +
                        "0.45s cubic-bezier(.25,.7,.25,1)";


                    path.style.strokeDashoffset =
                        "0";


                },
                250 + (index * 260)
            );

        }
    );


    /* ======================================================
       마지막 완성
    ====================================================== */

    const totalTime =
        250 +
        ((brushStrokes.length - 1) * 260) +
        450;


    setTimeout(
        function () {

            /*
                혹시 마스크 경계가 남아도
                마지막에 자연스럽게 전체 그림으로 전환
            */

            painting.style.transition =
                "none";

            painting.style.opacity =
                "1";

        },
        totalTime
    );


    /* ======================================================
       연출 종료
    ====================================================== */

    setTimeout(
        function () {

            paintingReveal.classList.remove(
                "show"
            );


            if (paintingArea) {
                paintingArea.style.display = "";
            }


            if (commonImageWrap) {
                commonImageWrap.style.display = "";
            }


            startCommonRoute();

        },
        totalTime
    );

}

/* ==========================================================
   ABCD 이후 공통 루트
========================================================== */

function startCommonRoute() {

    gameMode = "commonRoute";


    /* 기존 퍼즐 화면 정리 */

    const memorySelect =
        document.getElementById("memorySelect");

    if (memorySelect) {
        memorySelect.classList.remove("show");
    }


    const picturePuzzle =
        document.getElementById("picturePuzzle");

    if (picturePuzzle) {
        picturePuzzle.classList.remove("show");
    }


    const allPuzzles =
        document.querySelectorAll(
            "#comparePuzzle, #flashlightPuzzle, #footprintPuzzle, #dPuzzle"
        );

    allPuzzles.forEach(function (puzzle) {

        puzzle.classList.remove("show");

    });


    /* 공통 루트 표시 */

    const commonRoute =
        document.getElementById("commonRoute");

    if (commonRoute) {

        commonRoute.classList.add("show");

    }

    const dialogueBox =
        document.getElementById("dialogueBox");

    const dialogueName =
        document.getElementById("dialogue-name");

    const dialogueText =
        document.getElementById("dialogue-text");


    /* ==========================================================
   공통 루트 독백
========================================================== */

    const commonDialogues = [

        {
            name: "",
            text: "……이것으로 확실해졌다."
        },

        {
            name: "",
            text: "4조각의 기억이 보여주는 것은 장인석이 아닌, 누군가."
        },

        {
            name: "",
            text: "그마저도 모든 조각을 모아야만 온전한 이야기를 알 수 있다."
        },

        {
            name: "김솔음",
            text: "……아까는 곶감에, 이번엔 떡인가."
        },

        {
            name: "",
            text: "일기장에서 봤던 내용을 떠올린다면, 이 그림의 모티브는 「해와 달이 된 오누이」일 것이다."
        },

        {
            name: "김솔음",
            text: "그렇다면…… 떡에 무언가 숨겨져 있는 거겠지."
        }

    ];


    let commonDialogueIndex = 0;


    /* ==========================================================
       공통 루트 대사 표시
    ========================================================== */

    function showCommonDialogue() {

        const dialogue =
            commonDialogues[commonDialogueIndex];

        if (!dialogue) {
            return;
        }

        dialogueName.textContent =
            dialogue.name;

        typeText(
            dialogueText,
            dialogue.text
        );

        console.log(
            "공통 루트 대사 표시:",
            commonDialogueIndex,
            dialogue.text
        );
    }


    /* ==========================================================
       첫 번째 대사 표시
    ========================================================== */

    showCommonDialogue();


    /* ==========================================================
       대화창 표시
    ========================================================== */

    dialogueBox.classList.add("show");


    /* ==========================================================
       기존 onclick 제거
    ========================================================== */

    dialogueBox.onclick = null;


    /* ==========================================================
       공통 루트 전용 클릭 이벤트
    ========================================================== */

    const commonRouteClickHandler = function (event) {

        event.preventDefault();
        event.stopPropagation();

        // 타이핑 중이면 먼저 문장을 완성
        if (finishTyping()) {
            return;
        }


        console.log(
            "공통 루트 대화창 클릭"
        );


        commonDialogueIndex++;


        /* ======================================================
           다음 대사가 남아있는 경우
        ====================================================== */

        if (
            commonDialogueIndex <
            commonDialogues.length
        ) {

            showCommonDialogue();

            return;

        }


        /* ======================================================
           모든 대사 종료
        ====================================================== */

        dialogueBox.removeEventListener(
            "click",
            commonRouteClickHandler
        );


        dialogueBox.classList.remove("show");


        console.log(
            "공통 루트 독백 종료"
        );


        gameMode = "commonRoute";

    };


    /* ==========================================================
       이벤트 등록
    ========================================================== */

    dialogueBox.addEventListener(
        "click",
        commonRouteClickHandler
    );


    console.log(
        "공통 루트 시작"
    );

    /* ==========================================================
       공통 루트 - 송편 클릭
    ========================================================== */

    const songpyeonObject =
        document.getElementById("songpyeonObject");

    if (songpyeonObject) {

        songpyeonObject.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                // 송편 클릭은 공통 루트에서만 가능
                if (gameMode !== "commonRoute") {
                    return;
                }

                /*
                    공통 루트 대화 이벤트 종료
    
                    송편을 클릭한 이후에는
                    공통 루트 대사 클릭과
                    송편 대사 클릭이 동시에 실행되면 안 됨
                */
                dialogueBox.removeEventListener(
                    "click",
                    commonRouteClickHandler
                );

                gameMode = "songpyeon";

                const songpyeonDialogues = [

                    {
                        name: "김솔음",
                        text: "……이건."
                    },

                    {
                        name: "",
                        text: "무언가 말을 걸어오는 소리가 들려온다."
                    }

                ];

                let songpyeonDialogueIndex = 0;


                function showSongpyeonDialogue() {

                    const dialogue =
                        songpyeonDialogues[
                        songpyeonDialogueIndex
                        ];

                    dialogueName.textContent =
                        dialogue.name;

                    typeText(
                        dialogueText,
                        dialogue.text
                    );
                }


                // 첫 번째 대사 표시
                showSongpyeonDialogue();

                dialogueBox.classList.add("show");


                // 송편 대사 클릭 처리
                dialogueBox.onclick = function () {

                    // 타이핑 중이면 문장만 완성
                    if (finishTyping()) {
                        return;
                    }


                    // 다음 대사로 이동
                    songpyeonDialogueIndex++;


                    // 아직 대사가 남아 있으면 다음 대사 표시
                    if (
                        songpyeonDialogueIndex <
                        songpyeonDialogues.length
                    ) {

                        showSongpyeonDialogue();

                        return;
                    }


                    /*
                        ========================================
                        송편 대사 종료
                        ========================================
                    */

                    console.log("송편 대사 종료");

                    // 기존 송편 대화 클릭 이벤트 제거
                    dialogueBox.onclick = null;

                    // 대화창 숨기기
                    dialogueBox.classList.remove("show");


                    /*
                        ========================================
                        비밀번호 창 표시
                        ========================================
                    */

                    console.log("비밀번호 창 표시");

                    if (passwordOverlay) {

                        passwordOverlay.classList.add("show");

                        console.log(
                            "passwordOverlay class:",
                            passwordOverlay.className
                        );
                    }


                    // 입력창 초기화
                    if (passwordInput) {

                        passwordInput.value = "";

                        setTimeout(function () {
                            passwordInput.focus();
                        }, 50);
                    }


                    // 오류 메시지 초기화
                    if (passwordError) {

                        passwordError.textContent = "";

                    }


                    // 게임 상태 변경
                    gameMode = "password";

                };

            }
        );

    }

    /* ==========================================================
       송편 기억 - 비밀번호
    ========================================================== */



    if (passwordButton) {

        passwordButton.addEventListener(
            "click",
            function () {

                const answer =
                    passwordInput.value.trim();


                /* ==================================================
                   정답
                ================================================== */

                if (answer === "월광유촌") {

                    console.log("===== 비밀번호 정답 =====");

                    // 비밀번호 창 닫기
                    passwordOverlay.classList.remove("show");

                    // 게임 상태 변경
                    gameMode = "black";

                    // E 독백 시작
                    startBlackScene("E");

                    return;
                }


                /* ==================================================
                   오답
                ================================================== */

                else {

                    passwordError.textContent = "";

                    passwordOverlay.classList.remove("show");

                    gameMode = "passwordError";

                    const passwordErrorDialogues = [
                        {
                            name: "김솔음",
                            text: "……기억조각에서 누군가는 아이에 대해 이야기하고 있었어."
                        },
                        {
                            name: "김솔음",
                            text: "그렇다면, 거기서 나온 단서로 유추해 볼 수 있겠지."
                        },
                        {
                            name: "김솔음",
                            text: "장인석도 그에 대해 조사하던 것 같았는데."
                        },
                        {
                            name: "김솔음",
                            text: "스크랩북을 확인해 보자."
                        }
                    ];

                    let passwordErrorIndex = 0;

                    function showPasswordErrorDialogue() {

                        const dialogue =
                            passwordErrorDialogues[
                            passwordErrorIndex
                            ];

                        dialogueName.textContent =
                            dialogue.name;

                        typeText(
                            dialogueText,
                            dialogue.text
                        );
                    }

                    showPasswordErrorDialogue();

                    dialogueBox.classList.add("show");

                    dialogueBox.onclick = function () {

                        // 타이핑 중이면 문장 전체를 먼저 보여줌
                        if (finishTyping()) {
                            return;
                        }

                        passwordErrorIndex++;

                        // 다음 대사가 남아 있으면 계속 진행
                        if (
                            passwordErrorIndex <
                            passwordErrorDialogues.length
                        ) {

                            showPasswordErrorDialogue();

                            return;
                        }

                        // 모든 대사가 끝났으면 다시 비밀번호 입력
                        dialogueBox.onclick = null;

                        dialogueBox.classList.remove("show");

                        passwordOverlay.classList.add("show");

                        passwordInput.value = "";
                        passwordInput.focus();
                    };

                }

            }
        );

    }
}

/* ==========================================================
   E 이후 기억 장면
========================================================== */

const memoryScene =
    document.getElementById("memory-scene");

const memoryText =
    document.getElementById("memory-text");


async function playMemoryScene() {

    blackScene.classList.remove("show");

    memoryScene.classList.remove("hidden");

    await wait(300);


    const commonRouteImage =
        document.querySelector(".common-route-image");

    if (commonRouteImage) {
        commonRouteImage.classList.add("memory-low-view");
    }


    await wait(1200);

    /* ==========================================
           붉은 천이 천천히 시야를 덮음
        ========================================== */

    memoryScene.classList.add("red-cloth");

    /* ==========================================
       기억 장면 독백
    ========================================== */

    const memoryLines = [
        "붉은 천이 눈앞을 가리고,",
        "낯선 냄새가 코를 찌른다.",
        "사방에서 중얼거리는 소리와 함께",
        "촛불이 일렁인다.",
        "작은 손목이 붙잡혔다.",
        "북소리가 멎었다.",
        "밝아진 시야가 어두워지기 시작하였다.",
    ];


    for (const line of memoryLines) {

        memoryText.style.opacity = 0;

        await wait(350);

        memoryText.textContent = line;

        memoryText.style.opacity = 1;

        await wait(2200);
    }


    /* ==========================================
       마지막 시야 암전
    ========================================== */

    memoryText.style.opacity = 0;

    await wait(500);

    memoryScene.classList.remove("red-cloth");

    memoryScene.classList.add("red-dark");


    /* ==========================================
       완전히 어두워지는 동안 대사 등장
    ========================================== */

    await wait(1800);

    memoryText.textContent =
        "그리고,\n더 이상 움직이지 않았다.";

    memoryText.style.opacity = 1;

    await wait(2200);

    memoryText.style.opacity = 0;

    await wait(800);


    /* ==========================================
   기억 장면 종료
   → 수묵화 화면으로 복귀
========================================== */

    memoryScene.classList.remove("red-cloth");
    memoryScene.classList.remove("red-dark");


    await playAfterMemoryDialogue();


    /* ==========================================
   Glitch 종료
   → 수묵화 화면으로 복귀
========================================== */

    memoryScene.classList.add("hidden");

    const commonRoute =
        document.getElementById("commonRoute");

    if (commonRoute) {
        commonRoute.classList.add("show");
    }


    /* ==========================================
       수묵화 화면 원래 위치로 복구
    ========================================== */

    if (commonRouteImage) {

        commonRouteImage.classList.remove(
            "memory-low-view"
        );

        commonRouteImage.classList.remove(
            "memory-dark-view"
        );

    }

    dialogueName.textContent = "";
    dialogueText.textContent = "";


    /* ==========================================
       대화창 다시 표시
    ========================================== */

    playNextDialogue();


}

async function playNextDialogue() {

    gameMode = "afterGlitchDialogue";

    const nextDialogues = [

        {
            name: "김솔음",
            text: "......!"
        },

        {
            name: "김솔음",
            text: "허억, 헉."
        },

        {
            name: "",
            text: "방울소리, 피 비린내 그리고 간간히 들려왔던...."
        },

        {
            name: "",
            text: "무언가를 바치려는 주술적인 언어."
        },

        {
            name: "김솔음",
            text: "하나가 아니야."
        },

        {
            name: "김솔음",
            text: "그림에는 두 가지 기억이 섞여 있어."
        },

        {
            name: "",
            text: "신령이라고 불리던 것과 그 곁에 있던 아이."
        },

        {
            name: "",
            text: "방금 엿 본 기억은... 아이 쪽의 것이다."
        },

        {
            name: "김솔음",
            text: "대체 장인석은...... 무엇과 계약을 맺은 것이지?"
        },

        {
            name: "김솔음",
            text: "일기장에, 마지막 그림이 완성되었다고 했어."
        },

        {
            name: "",
            text: "그렇다면 그 안에도 같은 기억이 남아 있을지도 모른다."
        },

        {
            name: "김솔음",
            text: "......들어가자."
        }

    ];


    let nextDialogueIndex = 0;


    /* ==========================================================
       대사 표시
    ========================================================== */

    function showNextDialogue() {

        const dialogue =
            nextDialogues[nextDialogueIndex];

        if (!dialogue) {
            return;
        }

        dialogueName.textContent =
            dialogue.name;

        dialogueText.textContent = "";

        /* 기울임체 해제 */
        dialogueName.style.fontStyle = "normal";
        dialogueText.style.fontStyle = "normal";

        typeText(
            dialogueText,
            dialogue.text
        );
    }


    /* ==========================================================
       첫 대사
    ========================================================== */

    showNextDialogue();

    dialogueBox.classList.add("show");


    /* ==========================================================
       기존 클릭 이벤트 제거
    ========================================================== */

    dialogueBox.onclick = null;


    /* ==========================================================
       클릭으로 다음 대사
    ========================================================== */

    const nextDialogueClickHandler =
        async function (event) {

            event.preventDefault();
            event.stopPropagation();


            /* 타이핑 중이면 먼저 문장을 완성 */

            if (finishTyping()) {
                return;
            }


            nextDialogueIndex++;


            /* ======================================================
               다음 대사가 남아있는 경우
            ====================================================== */

            if (
                nextDialogueIndex <
                nextDialogues.length
            ) {

                showNextDialogue();

                return;
            }


            /* ======================================================
               모든 대사 종료
            ====================================================== */

            dialogueBox.removeEventListener(
                "click",
                nextDialogueClickHandler
            );


            /* ======================================================
               전체 화면 페이드 아웃
            ====================================================== */

            const mobileScreen =
                document.querySelector(".mobile-screen");

            if (mobileScreen) {

                mobileScreen.classList.add(
                    "fade-out"
                );

            }


            /* 1.5초 동안 페이드 아웃 */

            await wait(1500);


            gameMode = "commonRoute";

        };


    /* ==========================================================
       클릭 이벤트 등록
    ========================================================== */

    dialogueBox.addEventListener(
        "click",
        nextDialogueClickHandler
    );

}

function wait(ms) {

    return new Promise(
        function (resolve) {
            setTimeout(resolve, ms);
        }
    );

}

function createGlitchSlices() {

    const commonRouteImageWrap =
        document.querySelector(
            ".common-route-image-wrap"
        );

    const sliceCount = 12;

    for (let i = 0; i < sliceCount; i++) {

        const slice =
            document.createElement("div");

        slice.className = "glitch-slice";


        /* ==========================================
           실제 수묵화를 가로 조각으로 나눔
        ========================================== */

        const top =
            Math.random() * 100;

        const height =
            2 + Math.random() * 10;

        const bottom =
            100 - top - height;


        slice.style.setProperty(
            "--slice-top",
            `${top}%`
        );

        slice.style.setProperty(
            "--slice-bottom",
            `${Math.max(bottom, 0)}%`
        );


        /* ==========================================
           조각마다 움직이는 방향을 다르게
        ========================================== */

        const moveX =
            (Math.random() - 0.5) * 100;

        const moveY =
            (Math.random() - 0.5) * 8;


        slice.style.setProperty(
            "--glitch-x",
            `${moveX}px`
        );

        slice.style.setProperty(
            "--glitch-y",
            `${moveY}px`
        );


        /* ==========================================
           RGB 색상 조각
        ========================================== */

        const rgbType =
            Math.random();

        if (rgbType < 0.33) {

            slice.classList.add(
                "glitch-red"
            );

        } else if (rgbType < 0.66) {

            slice.classList.add(
                "glitch-blue"
            );

        } else {

            slice.classList.add(
                "glitch-normal"
            );
        }


        slice.style.animationDuration =
            `${70 + Math.random() * 160}ms`;

        slice.style.animationDelay =
            `${Math.random() * 60}ms`;


        commonRouteImageWrap.appendChild(
            slice
        );


        setTimeout(function () {

            slice.remove();

        }, 350);
    }
}

async function playGlitch() {

    const commonRoute =
        document.getElementById("commonRoute");


    /* ==========================================
       수묵화 화면 표시
    ========================================== */

    commonRoute.classList.add("show");


    /* ==========================================
       1차 Glitch
    ========================================== */

    commonRoute.classList.add("glitch");

    await wait(90);

    commonRoute.classList.remove("glitch");

    await wait(50);


    /* ==========================================
       2차 Glitch
    ========================================== */

    createGlitchSlices();

    commonRoute.classList.add(
        "glitch-heavy"
    );

    await wait(180);

    commonRoute.classList.remove(
        "glitch-heavy"
    );

    await wait(60);


    /* ==========================================
       3차 Glitch
    ========================================== */

    createGlitchSlices();

    commonRoute.classList.add(
        "glitch-heavy"
    );

    await wait(220);

    commonRoute.classList.remove(
        "glitch-heavy"
    );

    await wait(80);


    /* ==========================================
       최종 Glitch
    ========================================== */

    createGlitchSlices();

    commonRoute.classList.add(
        "glitch-final"
    );

    await wait(250);

    commonRoute.classList.remove(
        "glitch-final"
    );

    await wait(80);
}


/* ==========================================================
   기억 장면 이후 독백
========================================================== */

async function playAfterMemoryDialogue() {

    gameMode = "afterMemoryDialogue";


    const afterMemoryDialogues = [

        {
            name: "김솔음",
            text: "……살……"
        },

        {
            name: "김솔음",
            text: "……려……주세요……"
        },

        {
            name: "김솔음",
            text: "살려……주세요."
        },

        {
            name: "김솔음",
            text: "■■......"
        },

        {
            name: "김솔음",
            text: "■■■■■■■■■■■■"
        },

        {
            name: "김솔음",
            text: "살려주세요살려주세요제발살려주세요잘못했어요제가잘못했어요아파요무서워요집에가고싶어요엄마보고싶어요싫어요싫어요싫어요"
        },

    ];


    for (const dialogue of afterMemoryDialogues) {

        dialogueName.textContent =
            dialogue.name;

        dialogueText.textContent = "";

        dialogueBox.classList.add("show");

        let typingSpeed = 70;


        /* ------------------------------------------
           "살려주세요."는 조금 천천히
        ------------------------------------------ */

        if (
            dialogue.text === "……살……" ||
            dialogue.text === "……려……주세요……"
        ) {

            typingSpeed = 140;

        }


        /* ------------------------------------------
           "살려……주세요."는 조금 더 천천히
        ------------------------------------------ */

        if (
            dialogue.text === "살려……주세요."
        ) {

            typingSpeed = 110;

        }

        if (dialogue.text === "살려주세요살려주세요제발살려주세요잘못했어요제가잘못했어요아파요무서워요집에가고싶어요엄마보고싶어요싫어요싫어요싫어요") {
            typingSpeed = 8;
        }

        dialogueText.classList.remove("scream-text");

        if (
            dialogue.text ===
            "살려주세요살려주세요제발살려주세요잘못했어요제가잘못했어요아파요무서워요집에가고싶어요엄마보고싶어요싫어요싫어요싫어요"
        ) {

            dialogueText.classList.add("scream-text");

        }


        await typeText(
            dialogueText,
            dialogue.text,
            typingSpeed
        );


        /* ------------------------------------------
           대사별 정적 시간
        ------------------------------------------ */

        if (
            dialogue.text === "……살……" ||
            dialogue.text === "……려……주세요……"
        ) {

            await wait(1200);

        } else if (
            dialogue.text === "살려……주세요."
        ) {

            await wait(2200);

        } else if (
            dialogue.text === "■■......"
        ) {

            await wait(1200);

        } else if (
            dialogue.text === "■■■■■■■■■■■■"
        ) {

            await wait(1500);

        } else {

            await wait(1000);

        }

        /*
            마지막 대사가 아니면
            잠시 기다렸다가 자동으로 다음 대사
        */


    }

    await wait(2500);

    /* ==========================================
       Glitch 시작
       → 기존 대사 숨김
    ========================================== */

    dialogueBox.classList.remove("show");

    await wait(100);

    await playGlitch();

}



