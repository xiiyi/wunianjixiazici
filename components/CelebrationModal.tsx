
import React from 'react';

interface CelebrationModalProps {
    show: boolean;
    title: string;
    message: string;
    emoji: string;
    onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
    show,
    title,
    message,
    emoji,
    onClose,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 背景遮罩 */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm animate__animated animate__fadeIn"
                onClick={onClose}
            />

            {/* 弹窗内容 */}
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl animate__animated animate__bounceIn max-w-md w-full text-center border-4 border-green-200">
                {/* 顶部装饰 */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <div className="text-8xl animate__animated animate__tada animate__infinite">{emoji}</div>
                </div>

                {/* 星星装饰 */}
                <div className="absolute top-4 left-4 text-3xl animate__animated animate__flash animate__infinite animate__slower">✨</div>
                <div className="absolute top-4 right-4 text-3xl animate__animated animate__flash animate__infinite animate__slower animate__delay-1s">🌟</div>
                <div className="absolute bottom-4 left-4 text-3xl animate__animated animate__flash animate__infinite animate__slower animate__delay-2s">⭐</div>
                <div className="absolute bottom-4 right-4 text-3xl animate__animated animate__flash animate__infinite animate__slower">💫</div>

                <div className="mt-8 mb-6">
                    <h2 className="text-3xl md:text-4xl font-cartoon text-green-600 mb-4">{title}</h2>
                    <p className="text-xl md:text-2xl text-gray-600 font-cartoon">{message}</p>
                </div>

                <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-cartoon text-xl md:text-2xl px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
                >
                    继续挑战 →
                </button>
            </div>
        </div>
    );
};

export default CelebrationModal;
