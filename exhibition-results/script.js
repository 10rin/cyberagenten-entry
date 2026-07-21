document.addEventListener('DOMContentLoaded', () => {
    
    const steps = [
        { id: 'step-2', duration: 6500 },
        { id: 'step-3', duration: 5000 },
        { id: 'step-4', duration: null } // 最後のステップは停止
    ];

    let currentStepIndex = 0;

    // ステップ遷移を実行する関数
    function navigateToNextStep() {
        if (currentStepIndex >= steps.length - 1) return;

        const currentStepEl = document.getElementById(steps[currentStepIndex].id);
        currentStepIndex++;
        const nextStepEl = document.getElementById(steps[currentStepIndex].id);

        // フェードアウト状態を適用
        currentStepEl.classList.add('leaving');

        setTimeout(() => {
            currentStepEl.classList.remove('active', 'leaving');
            nextStepEl.classList.add('active');

            // 特殊な初期化処理 (各ステップが有効になった時)
            onStepActive(steps[currentStepIndex].id);

            // 次の自動遷移タイマーをセット
            const nextDuration = steps[currentStepIndex].duration;
            if (nextDuration !== null) {
                setTimeout(navigateToNextStep, nextDuration);
            }
        }, 800); // style.css のイージングトランジション時間に合わせる
    }

    // 各ステップが有効になった瞬間のフック
    function onStepActive(stepId) {
        if (stepId === 'step-4') {
            triggerCollageAnimation();
        }
    }

    // コラージュ画像の生成と配置
    const collageImages = [
        'images/transparency.jpg',
        'images/serenity.jpg',
        'images/light_margin.jpg',
        'images/floating.jpg',
        'images/symmetry.jpg',
        'images/warmth.jpg',
        'images/shadow.jpg'
    ];

    const collageCanvas = document.getElementById('collage-canvas');

    // コラージュDOMを初期生成して配置 (グリッド表示)
    function initCollage() {
        if (!collageCanvas) return;
        
        const totalImages = 10; // 5列 x 2行 のグリッド
        for (let i = 0; i < totalImages; i++) {
            const item = document.createElement('div');
            item.className = 'collage-item';

            const img = document.createElement('img');
            img.src = collageImages[i % collageImages.length];
            img.alt = `Selected footprint ${i + 1}`;

            item.appendChild(img);
            collageCanvas.appendChild(item);
        }
    }

    function triggerCollageAnimation() {
        // グリッド即時表示のため個々のアニメーションは不要
    }

    // 初期化と起動
    initCollage();

    // 最初のステップの自動遷移を予約
    setTimeout(navigateToNextStep, steps[0].duration);
});
