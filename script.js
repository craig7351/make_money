let monthlySalary = 0;
let incomePerSecond = 0;
let totalIncome = 0;
let coinInterval;
let incomeInterval;
let coinSound;
let lastSoundTime = 0;

// 初始化音效
function initSound() {
    coinSound = document.getElementById('coinSound');
    // 设置音量
    coinSound.volume = 0.3;
}

function startAnimation() {
    const salaryInput = document.getElementById('salaryInput');
    monthlySalary = parseFloat(salaryInput.value);
    
    if (isNaN(monthlySalary) || monthlySalary <= 0) {
        alert('請輸入有效的月薪');
        return;
    }

    // 初始化音效
    initSound();
    lastSoundTime = Date.now();

    // 计算每秒收入
    incomePerSecond = monthlySalary / 2592000;
    
    // 切换屏幕
    document.getElementById('inputScreen').classList.add('hidden');
    document.getElementById('animationScreen').classList.remove('hidden');
    
    // 开始动画
    startCoinAnimation();
    startIncomeCounter();
}

function playRandomSound() {
    const currentTime = Date.now();
    const timeSinceLastSound = (currentTime - lastSoundTime) / 1000; // 转换为秒
    
    // 如果距离上次播放超过随机时间（1-5秒），则播放音效
    if (timeSinceLastSound >= Math.random() * 4 + 1) {
        if (coinSound) {
            coinSound.currentTime = 0;
            coinSound.play().catch(error => {
                console.log('音頻播放失敗:', error);
            });
            lastSoundTime = currentTime;
        }
    }
}

function startCoinAnimation() {
    const coinsContainer = document.getElementById('coinsContainer');
    
    coinInterval = setInterval(() => {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.textContent = '💰';
        
        // 随机水平位置，确保在宝箱上方
        const left = Math.random() * 200 + 50; // 50-250px之间
        coin.style.left = `${left}px`;
        coin.style.top = '-50px'; // 从屏幕上方开始
        
        coinsContainer.appendChild(coin);
        
        // 随机播放音效
        playRandomSound();
        
        // 动画结束后移除金币
        setTimeout(() => {
            coin.remove();
        }, 3000);
    }, 100);
}

function startIncomeCounter() {
    const incomeDisplay = document.getElementById('incomePerSecond');
    
    incomeInterval = setInterval(() => {
        totalIncome += incomePerSecond;
        incomeDisplay.textContent = `¥${totalIncome.toFixed(2)}`;
    }, 1000);
}

// 清理定时器
function stopAnimation() {
    clearInterval(coinInterval);
    clearInterval(incomeInterval);
}

// 页面关闭时清理定时器
window.addEventListener('beforeunload', stopAnimation); 