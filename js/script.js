document.addEventListener('DOMContentLoaded', ()=>{
//---------------------------TEST-START
const testStart = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.main-modal');
    
function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}
function closeModal(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
testStart.forEach(btn =>{
    btn.addEventListener('click', openModal);
});
modal.addEventListener('click', (e) =>{
    if(e.target === modal || e.target.getAttribute('data-close') == ''){
        closeModal();
    }
});
//-----------------------------SECOND-MODAL
const connect = document.querySelector('#submit'),
    secondModal = document.querySelector('.main-second-modal'),
    secondModalInput = document.querySelectorAll('.second-modal-input'),
    modalForm = document.querySelector('form'),
    modalClose = document.querySelector('.second-modal-close'),
    inputTel = document.querySelector('input[name="phone"]');
    
    
connect.addEventListener('click', () =>{
     secondModal.style.display = 'block';
     document.body.style.overflow = 'hidden';
});
modalForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(secondModalInput === ''){
        secondModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }else{
        secondModal.style.display = 'none';
        document.body.style.overflow = '';
        secondModalInput.forEach(inputs =>{
            inputs.value = '';
        });
    }
});
modalClose.addEventListener('click', () =>{
    secondModal.style.display = 'none';
    document.body.style.overflow = '';
    secondModalInput.forEach(inputs =>{
        inputs.value = '';
    });
});

inputTel.addEventListener('input', () =>{
    inputTel.value = inputTel.value.replace(/[^+\d]/g, '');
});




//----------------------QUESTIONS
const questions = [
    {
        questionNumber: 'Вопрос 1',
        question: 'Семейное положение',
        answers: [
            'Квартира приобреталась в браке',
            'Квартира приобреталась и выплачивалась не в браке',
            'Ипотека выплачивалась в браке'
        ], 
        correct: 1
    },
    {
        questionNumber: 'Вопрос 2',
        question: 'Квартира приобреталась с использованием кредитных средств?',
        answers: [
            'Да',
            'Нет'
        ], 
        correct: 1
    },
    {
        questionNumber: 'Вопрос 3',
        question: 'Квартира находится в доме-памятнике?',
        answers: [
            'Вновь выявленный объект культурного наследия',
            'Памятник архитектуры',
            'Памятник архитектуры со списком непередаваемых элементов'
        ], 
        correct: 1
    },
    {
        questionNumber: 'Вопрос 4',
        question: 'Планируете ли при продаже покупать альтернативную квартиру?',
        answers: [
            'Да',
            'Нет'
        ],
        correct: 1
    }
];

//-----------------FOUND-ELEMENTS

const questionNumber = document.querySelector('#number'),
      headerTitle = document.querySelector('#title'),
      list = document.querySelector('#list'),
      nextBtn = document.querySelector('#next');

let questionIndex = 0;
let score = 0;


function clearPage(){
    questionNumber.innerHTML = '';
    headerTitle.innerHTML = '';
    list.innerHTML = '';
}
clearPage();

function showQuestion(){
    
    let headerTemplateNumber = `<p>%span%</p>`;
    let headerTemplate = `<h4>%title%</h4>`;
    const titleNumber = headerTemplateNumber.replace('%span%', questions[questionIndex]['questionNumber']);
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

    questionNumber.innerHTML = titleNumber;
    headerTitle.innerHTML = title;
    
//------------------------OUTPUT OF ANSWERS
    let answerNumber = 1;
    for(let answerText of questions[questionIndex]['answers']){
        
        const questionTemplate = `
                    <li>
                        <label class="custom-radio">
                            <input value="%number%" type="radio" name="answer">
                            <span class="fake"></span>
                            <span class="text">%answer%</span>
                        </label>
                    </li>`;

       let answerHTML = questionTemplate
                                    .replace('%answer%', answerText)
                                    .replace('%number%', answerNumber);
       
       list.innerHTML += answerHTML;
       answerNumber++;
    }
}

showQuestion();

nextBtn.onclick = checkAnswer;

function checkAnswer(){
    const checkRadio = list.querySelector('input[type="radio"]:checked');
    
    if(!checkRadio){
        nextBtn.blur();
        return;
    }
    if(questionIndex !== questions.length -1){
        questionIndex++;
        clearPage();
        showQuestion();
    }else{
        clearPage();
        showResults();
    }
    let userAnswer = parseInt(checkRadio.value);
    console.log(userAnswer, questions[questionIndex]['correct']);

    if(userAnswer === questions[questionIndex]['correct']){
        score++;
    }
}

function showResults(){
    const resultsTemplate = `
            <h2 class="title">%title%</h2>
            <h3 class="message">%message%</h3>
            <p class="result">%result%</p>
            `;
    let title, message;
    
    if(score === questions.length){
        title = 'Поздравляем! 🏆';
        message = 'Вы ответили правильно на все вопросы! 👍';
    }else if((score * 100) / questions.length >= 50){
        title = 'Неплохой результат! 😉';
        message = 'Вы ответили правильно на большую часть вопросов! 👍';
    }else{
        title = 'Стоит постараться! 😐';
        message = 'Вы ответили неправильно! Попробуйте пройти тест снова!';
    }

    let result = `${score} из ${questions.length}`;


    const finalMessage = resultsTemplate
                                    .replace('%title%', title)
                                    .replace('%message%', message)
                                    .replace('%result%', result);

    headerTitle.innerHTML = finalMessage;     
    
    nextBtn.blur();
    nextBtn.innerHTML = 'Начать заново';
    nextBtn.onclick = () => {history.go()};
}
   
});