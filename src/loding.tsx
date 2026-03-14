import React from 'react';

const Loading: React.FC = () => {
    return (
        <div style={styles.loaderWrapper}>
            <style>
                {`
                /* أنميشن لظهور المحتوى بنعومة */
                @keyframes fadeInContainer {
                    0% { opacity: 0; transform: translateY(15px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                /* أنميشن نبض هادئ للشعار الآسيوي */
                @keyframes AsianLogoPulse {
                    0% { opacity: 0.9; transform: translateY(0px) rotate(-10deg); }
                    50% { opacity: 1; transform: translateY(-5px) rotate(-10deg); }
                    100% { opacity: 0.9; transform: translateY(0px) rotate(-10deg); }
                }

                /* أنميشن خط التحميل المستقيم والمشع */
                @keyframes lineFlow {
                    0% { left: -100%; }
                    50% { left: 0%; }
                    100% { left: 100%; }
                }

                /* تأثير الشيمر (اللمعان) على النص الملكي */
                @keyframes textShimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }

                .animate-content {
                    animation: fadeInContainer 1.2s ease-out forwards;
                }

              
                `}
            </style>
            
            <div style={styles.content} className="animate-content">
                {/* شعار عصي الأكل الآسيوية الفاخرة */}
                <div >
                   <i className="fa-solid fa-bowl-rice" style={styles.iconChopsticks}></i>
                </div>
                
                {/* اسم البراند بتأثير اللمعان الذهبي */}
                <h2 style={styles.text} className="logo-shimmer">Ocean Pearl</h2>
                
                {/* حاوية خط التحميل المستقيم الأنيق */}
                <div style={styles.progressContainer}>
                    <div style={styles.progressBar}>
                        <div style={styles.progressFlow}></div>
                    </div>
                    {/* ظل متوهج أسفل الخط لإعطاء عمق */}
                    <div style={styles.progressGlow}></div>
                </div>
                
                <p style={styles.subtext}>Preparing Your Royal Voyage...</p>
            </div>
        </div>
    );
};

// تعريف الثوابت التصميمية لتوحيد المظهر
const GOLD = '#C5A059'; // اللون الذهبي المعتمد براند Ocean Pearl
const DARK_BG = '#0b0b0b'; // السواد العميق للخلفية
const WHITE = '#ffffff';

const styles: { [key: string]: React.CSSProperties } = {
    loaderWrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: DARK_BG,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // التأكد من أنه فوق كل شيء
        overflow: 'hidden',
    },
    content: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px', // مسافة ثابتة بين العناصر
    },
    /* تنسيق شعار عصي الأكل (Chopsticks) */
    logoContainer: {
        marginBottom: '15px',
        /* استخدام أيقونة stroopwafel كبديل لعصي الأكل إذا لم تتوفر الأيقونة المباشرة، 
           أو قم بتغييرها إلى "fa-solid fa-chopsticks" إذا كانت نسختك تدعمها */
        animation: 'AsianLogoPulse 2.5s infinite ease-in-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'rotate(-10deg)', // إمالة فنية للشعار
    },
    iconChopsticks: {
        fontSize: '3.5rem', // حجم كبير وواضح
        color: GOLD,
        filter: `drop-shadow(0 0 10px rgba(197, 160, 89, 0.5))`, // توهج ناعم
    },
    /* تنسيق النصوص الملكية */
    text: {
        fontFamily: "'Playfair Display', serif",
        color: WHITE,
        fontSize: '2rem', // تكبير الحجم قليلاً
        letterSpacing: '10px', // زيادة التباعد لإعطاء هيبة أكبر
        textTransform: 'uppercase',
        fontWeight: '700',
        margin: 0,
        lineHeight: '1.2',
        textShadow: '0 3px 6px rgba(0,0,0,0.6)',
    },
    subtext: {
        fontFamily: "'Inter', sans-serif",
        color: GOLD,
        fontSize: '0.95rem',
        letterSpacing: '3px',
        opacity: 0.8,
        marginTop: '5px',
        fontWeight: '300',
    },
    /* تنسيق خط التحميل المستقيم السينمائي */
    progressContainer: {
        position: 'relative',
        width: '300px', // عرض الخط
        marginTop: '15px',
    },
    progressBar: {
        width: '100%',
        height: '2px', // خط رفيع جداً وراقي
        backgroundColor: 'rgba(197, 160, 89, 0.08)', // خلفية باهتة جداً
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '2px',
    },
    progressFlow: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        /* تدرج ضوئي يتدفق عبر الخط */
        background: `linear-gradient(90deg, transparent 0%, ${GOLD} 40%, ${WHITE} 50%, ${GOLD} 60%, transparent 100%)`,
        animation: 'lineFlow 2s infinite linear',
    },
    progressGlow: {
        position: 'absolute',
        top: '1px',
        left: '10%',
        width: '80%',
        height: '6px',
        background: GOLD,
        filter: 'blur(7px)', // تأثير التوهج الخلفي
        opacity: 0.25,
        pointerEvents: 'none',
    }
};

export default Loading;