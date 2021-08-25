(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div> <img src=${currentQuestion.src} alt="img" width="600" hight="600"> </div>  
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} od ${myQuestions.length}`;
      againButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;

      if(currentSlide === 0){
        previousButton.style.display = 'none';
        againButton.style.display = 'none';
  
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
       
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }

    function reload() {
        reload = window.location.reload();
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {   
        question: "Kateri planet je na sliki ?",
        src: "https://dailyamazingthings.com/wp-content/uploads/2021/01/mars.jpg", 
        answers: {
          a: "Jupiter",
          b: "Venera",
          c: "Mars"
        },
        correctAnswer: "c"
      },
      {
        question: "Kdo je na sliki ?",
        src:"https://www.radiobihac.com/files/news/60753f2786cab8.54255614_Juri-Gagarin.jpg",
        answers: {
          a: "Neil Armstrong",
          b: "Buzz Aldrin",
          c: "Jurij Aleksejevič Gagarin"
        },
        correctAnswer: "c"
      },
      {
        question: "Kaj je na sliki?",
        src:"https://upload.wikimedia.org/wikipedia/commons/0/04/International_Space_Station_after_undocking_of_STS-132.jpg",
        answers: {
          a: "Vesoljski teleskop Hubble",
          b: "Vesoljska postaja Mir",
          c: "Raketoplan (Space Shuttle)",
          d: "Mednarodna vesoljska postaja"
        },
        correctAnswer: "d"
      },
      {
        question: "Kateri planet je to?",
        src:"https://upload.wikimedia.org/wikipedia/commons/c/c1/Saturn_-_April_25_2016_%2837612580000%29.png",
        answers: {
          a: "Saturn",
          b: "Jupiter",
          c: "Neptun",
          d: "Merkur"
        },
        correctAnswer: "a"
      },
      {
        question: "Kolikšna je razdalja od Zemlje do Lune ?",
        src:"https://scx1.b-cdn.net/csz/news/800a/2015/didweneedthe.jpg",
        answers: {
          a: "3.000.000 km",
          b: "384.400 km",
          c: "100.000 km",
          d: "2000 km"
        },
        correctAnswer: "b"
      },
      {
        question: "Kako pravimo nebesnemu telesu na sliki ?",
        src:"https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/Corbis-EN001001_umzqks.jpg",
        answers: {
          a: "Komet",
          b: "Nočni utrinek",
          c: "Meteor",
          d: "NLP"
        },
        correctAnswer: "a"
      },
      {
        question: "Prepoznaj planet.",
        src:"https://wallpapercave.com/wp/wp1898932.jpg",
        answers: {
          a: "Neptun",
          b: "Jupiter",
          c: "Merkur",
        },
        correctAnswer: "a"
      },

    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const againButton = document.getElementById("again");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
    againButton.addEventListener("click",reload)
  })();
  