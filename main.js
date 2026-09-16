let questionsList = [];
    let currentQuestionIndex = 0;
    let dodgeCount = 0;
    let correctScale = 1;

    const germanHints = [
      "Versuch es zu fangen! 😉",
      "Fast erwischt! 🎀",
      "Zu schnell für dich! ⚡",
      "Klick lieber die richtige Antwort! 💖",
      "Keine Chance! 💕"
    ];

    function addQuestion() {
      const question = document.getElementById('questionInput').value.trim();
      const correct = document.getElementById('correctInput').value.trim();
      const wrong = document.getElementById('wrongInput').value.trim();

      if (!question || !correct || !wrong) return;

      questionsList.push({ question, correct, wrong });
      document.getElementById('qCount').innerText = questionsList.length;

      document.getElementById('questionInput').value = '';
      document.getElementById('correctInput').value = '';
      document.getElementById('wrongInput').value = '';
      document.getElementById('questionInput').focus();
    }

    function startGame() {
      const question = document.getElementById('questionInput').value.trim();
      const correct = document.getElementById('correctInput').value.trim();
      const wrong = document.getElementById('wrongInput').value.trim();

      if (question && correct && wrong) {
        questionsList.push({ question, correct, wrong });
      }

      if (questionsList.length === 0) return;

      currentQuestionIndex = 0;
      document.getElementById('setupScreen').classList.add('hidden');
      document.getElementById('gameScreen').classList.remove('hidden');

      loadQuestion();
    }

    function loadQuestion() {
      dodgeCount = 0;
      correctScale = 1;
      const currentQ = questionsList[currentQuestionIndex];

      document.getElementById('questionProgress').innerText = `Frage ${currentQuestionIndex + 1} von ${questionsList.length}`;
      document.getElementById('displayQuestion').innerText = currentQ.question;
      document.getElementById('hintText').innerText = germanHints[0];

      const correctBtn = document.getElementById('correctBtn');
      correctBtn.innerText = currentQ.correct;
      correctBtn.style.transform = 'scale(1)';

      const wrongBtn = document.getElementById('wrongBtn');
      wrongBtn.innerText = currentQ.wrong;

      wrongBtn.classList.remove('running');
      wrongBtn.style.top = 'auto';
      wrongBtn.style.left = 'auto';
    }

    function dodgeButton() {
      dodgeCount++;

      correctScale += 0.2;
      const correctBtn = document.getElementById('correctBtn');
      correctBtn.style.transform = `scale(${correctScale})`;

      const msgIndex = Math.min(dodgeCount, germanHints.length - 1);
      document.getElementById('hintText').innerText = germanHints[msgIndex];

      const wrongBtn = document.getElementById('wrongBtn');

      if (!wrongBtn.classList.contains('running')) {
        wrongBtn.classList.add('running');
      }

      const btnRect = wrongBtn.getBoundingClientRect();
      const padding = 30;

      const maxX = window.innerWidth - btnRect.width - padding;
      const maxY = window.innerHeight - btnRect.height - padding;

      const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
      const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

      wrongBtn.style.left = `${randomX}px`;
      wrongBtn.style.top = `${randomY}px`;
    }

    function handleCorrectAnswer() {
      const wrongBtn = document.getElementById('wrongBtn');
      wrongBtn.classList.remove('running');

      if (currentQuestionIndex + 1 < questionsList.length) {
        currentQuestionIndex++;
        loadQuestion();
      } else {
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('successScreen').classList.remove('hidden');

         triggerConfetti();
      }
    }

    function resetToSetup() {
      questionsList = [];
      document.getElementById('qCount').innerText = '0';
      document.getElementById('successScreen').classList.add('hidden');
      document.getElementById('setupScreen').classList.remove('hidden');
    }

    function triggerConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // left bomb
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors: ['#ff61d2', '#ec4899', '#8b5cf6', '#fe9090']
  });

  // right bomb
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors: ['#ff61d2', '#ec4899', '#8b5cf6', '#fe9090']
  });
}
