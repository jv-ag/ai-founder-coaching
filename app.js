// State Management
const STATE_KEY = 'founderCoachingState';

// Initialize or load state
function getState() {
  const saved = localStorage.getItem(STATE_KEY);
  return saved ? JSON.parse(saved) : {
    profile: null,
    superpower: null,
    validation: {
      customerConvos: null,
      willingToPay: null
    },
    runway: null,
    pitch: {
      problem: '',
      who: '',
      fear: ''
    },
    score: {
      ai: null,
      personalityRead: 0,
      strategicInsight: 0,
      harshHonesty: 0,
      actionability: 0
    },
    generatedPrompt: '',
    percentile: 0,
    completedAt: null
  };
}

function saveState(updates) {
  const current = getState();
  const newState = { ...current, ...updates };
  localStorage.setItem(STATE_KEY, JSON.stringify(newState));
  return newState;
}

function clearState() {
  localStorage.removeItem(STATE_KEY);
}

// Card Selection Handler
function selectCard(value, nextPage) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('selected'));
  event.target.closest('.card').classList.add('selected');
  
  // Auto-advance after brief delay
  setTimeout(() => {
    window.location.href = nextPage;
  }, 300);
}

// Multi-select card handler (for validation page with 2 questions)
function selectMultiCard(questionKey, value) {
  const card = event.target.closest('.card');
  card.classList.add('selected');
  
  // Store in state
  const state = getState();
  state.validation[questionKey] = value;
  saveState(state);
  
  // Check if both questions answered
  checkValidationComplete();
}

function checkValidationComplete() {
  const state = getState();
  if (state.validation.customerConvos && state.validation.willingToPay) {
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
      nextBtn.classList.remove('btn-disabled');
    }
  }
}

// Star Rating Handler
function setRating(metric, rating) {
  const state = getState();
  state.score[metric] = rating;
  saveState(state);
  
  // Update UI
  const container = event.target.closest('.rating-group');
  const stars = container.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });
  
  checkScoreComplete();
}

function checkScoreComplete() {
  const state = getState();
  const allRated = state.score.ai && 
                   state.score.personalityRead > 0 &&
                   state.score.strategicInsight > 0 &&
                   state.score.harshHonesty > 0 &&
                   state.score.actionability > 0;
  
  if (allRated) {
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
      nextBtn.classList.remove('btn-disabled');
    }
  }
}

// Copy to Clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('Failed to copy. Please select and copy manually.');
  }
}

// Progress Bar Update
function updateProgress(step, total = 8) {
  const progressBar = document.querySelector('.progress-fill');
  if (progressBar) {
    const percentage = (step / total) * 100;
    progressBar.style.width = `${percentage}%`;
  }
}

// Form Handlers
function savePitch() {
  const problem = document.getElementById('problem').value;
  const who = document.getElementById('who').value;
  const fear = document.getElementById('fear').value;
  
  saveState({
    pitch: { problem, who, fear }
  });
}

function loadPitch() {
  const state = getState();
  const problemInput = document.getElementById('problem');
  const whoInput = document.getElementById('who');
  const fearInput = document.getElementById('fear');
  
  if (problemInput && state.pitch.problem) problemInput.value = state.pitch.problem;
  if (whoInput && state.pitch.who) whoInput.value = state.pitch.who;
  if (fearInput && state.pitch.fear) fearInput.value = state.pitch.fear;
}

function checkPitchComplete() {
  const problem = document.getElementById('problem').value.trim();
  const who = document.getElementById('who').value.trim();
  const fear = document.getElementById('fear').value.trim();
  
  const nextBtn = document.getElementById('nextBtn');
  if (problem && who && fear) {
    nextBtn.classList.remove('btn-disabled');
  } else {
    nextBtn.classList.add('btn-disabled');
  }
}

// Open AI Platform
function openAI(platform) {
  const state = getState();
  const prompt = state.generatedPrompt;
  
  const urls = {
    claude: 'https://claude.ai/new',
    chatgpt: 'https://chat.openai.com/',
    gemini: 'https://gemini.google.com/'
  };
  
  // Copy prompt first
  navigator.clipboard.writeText(prompt).catch(err => console.error('Copy failed:', err));
  
  // Open platform
  window.open(urls[platform], '_blank');
}

// Calculate Percentile (fake data for MVP)
function calculatePercentile() {
  const state = getState();
  const avgScore = (
    state.score.personalityRead +
    state.score.strategicInsight +
    state.score.harshHonesty +
    state.score.actionability
  ) / 4;
  
  // Map 1-5 star average to percentile (fake but realistic)
  // 5 stars = top 10%, 4 stars = top 30%, 3 stars = 50%, etc.
  const percentileMap = {
    5: Math.floor(Math.random() * 10) + 90,  // 90-99th
    4: Math.floor(Math.random() * 20) + 70,  // 70-89th
    3: Math.floor(Math.random() * 30) + 40,  // 40-69th
    2: Math.floor(Math.random() * 25) + 15,  // 15-39th
    1: Math.floor(Math.random() * 15) + 1    // 1-14th
  };
  
  const roundedAvg = Math.round(avgScore);
  return percentileMap[roundedAvg] || 50;
}

// Restart Flow
function restartFlow() {
  if (confirm('Start a new session? Your current progress will be saved in history.')) {
    clearState();
    window.location.href = 'index.html';
  }
}
