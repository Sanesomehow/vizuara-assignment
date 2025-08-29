import { useState, useEffect } from "react";
import { ArrowLeft, Brain, Eye, Heart, Target, Zap, Star, ChevronRight, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
// import abstractionAnimation from "./assets/Abstraction.json";
import aiAssistant from "./assets/AI-assistant.json";

export default function EmotionDetectiveApp() {
  const getBackgroundGradient = () => {
    if (currentChapter === 0) return "bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50"; 
    if (currentChapter === 1) return "bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100";
    if (currentChapter === 2) return "bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200";
    if (currentChapter === 3) return "bg-gradient-to-b from-blue-600 via-blue-400 to-blue-300"; 
    if (currentChapter === 4) return "bg-gradient-to-b from-blue-800 via-blue-600 to-blue-400"; 
    if (currentChapter === 5) return "bg-gradient-to-b from-indigo-900 via-blue-800 to-blue-700"; 
    if (currentChapter >= 6) return "bg-gradient-to-b from-black via-indigo-900 to-blue-900"; 
    return "bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50";
  };
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [animateIn, setAnimateIn] = useState<boolean>(true);
  const [detectivePoints, setDetectivePoints] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [showNameInput, setShowNameInput] = useState<boolean>(true);
  type ReviewId = 'review1' | 'review2' | 'review3';
  type ReviewAnswers = { review1: string | null; review2: string | null; review3: string | null };
  const [reviewAnswers, setReviewAnswers] = useState<ReviewAnswers>({
    review1: null,
    review2: null,
    review3: null,
  });

  const correctAnswers: { [key in ReviewId]: string } = {
    review1: "positive",
    review2: "negative", 
    review3: "neutral",
  };

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, [currentChapter]);

  const nextChapter = (chapter: number) => {
    if (chapter > currentChapter) {
      setDetectivePoints(prev => prev + 10);
    }
    setCurrentChapter(chapter);
  };

  const handleAnswerSelect = (reviewId: ReviewId, answer: string) => {
    setReviewAnswers(prev => ({
      ...prev,
      [reviewId]: answer,
    }));
    if (answer === correctAnswers[reviewId]) {
      setDetectivePoints(prev => prev + 15);
    }
  };

  const getReviewFeedback = (reviewId: ReviewId): boolean | null => {
    if (!reviewAnswers[reviewId]) return null;
    return reviewAnswers[reviewId] === correctAnswers[reviewId];
  };

  const SparkAI = ({ message, mood = "happy" }: { message: string; mood?: string }) => (
      <div className="flex items-start gap-3 mb-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
    mood === "happy"
      ? "bg-gradient-to-br from-blue-400 to-purple-500"
      : mood === "excited"
      ? "bg-gradient-to-br from-yellow-400 to-orange-500"
      : mood === "sad"
      ? "bg-gradient-to-br from-slate-400 to-gray-500"
      : "bg-gradient-to-br from-green-400 to-teal-500"
  }`}>
          <Lottie animationData={aiAssistant} loop={true} style={{ width: 120, height: 120 }} />
        </div>
        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg max-w-md animate-in slide-in-from-left duration-700">
          <p className="text-gray-800">{message}</p>
        </div>
      </div>
  );

  const ProgressBar = () => (
    <div className="fixed top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg">
      <Star className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-bold text-gray-700">{detectivePoints} pts</span>
    </div>
  );

  if (showNameInput) {
    return (
  <div className="min-h-screen bg-blue-800 flex items-center justify-center p-4 relative overflow-hidden">

        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#60A5FA" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>
        <div className="bg-white/95 backdrop-blur rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-700">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lottie animationData={aiAssistant} loop={true} style={{ width: 100, height: 100 }} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Emotion Detective Academy!</h2>
            <p className="text-gray-600">I'm Spark, your AI sidekick! What should I call you?</p>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your detective name..."
            className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none mb-4 text-center font-medium"
            onKeyPress={(e) => e.key === 'Enter' && userName && setShowNameInput(false)}
          />
          <button
            onClick={() => userName && setShowNameInput(false)}
            disabled={!userName}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 focus:bg-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow"
          >
            Start My Detective Journey! 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} relative overflow-hidden`}>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

        {currentChapter >= 4 && (
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  opacity: Math.random() * 0.7 + 0.3,
                  filter: 'blur(0.5px)',
                  transition: 'opacity 1s',
                  animation: `twinkle ${Math.random() * 2 + 1}s infinite alternate`,
                }}
              />
            ))}
            <style>{`
              @keyframes twinkle {
                from { opacity: 0.3; }
                to { opacity: 1; }
              }
            `}</style>
          </div>
        )}
      </div>

      <ProgressBar />

      {currentChapter > 0 && (
        <button
          onClick={() => {
            console.log("clicked");
            nextChapter(currentChapter - 1)}}
          className="fixed top-4 left-4 p-3 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all duration-300 text-white border border-white/20 z-50"
          style={{zIndex: 50}}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-4xl transition-all duration-700 ${animateIn ? 'animate-in slide-in-from-right' : 'animate-out slide-out-to-left'}`}>
          
          {currentChapter === 0 && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-white mb-4 animate-in zoom-in duration-1000">
                  <span className="text-blue-700">Detective</span>
                  <span className="ml-2 text-purple-600 font-extrabold">{userName}</span>
                </h1>
                <p className="text-xl text-blue-200 animate-in slide-in-from-bottom duration-1000 delay-300">
                  <span className="text-pink-500">Your first mission awaits...</span>
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-3xl p-8 animate-in zoom-in duration-1000 delay-500">
                <SparkAI 
                  message={`Welcome to the academy, Detective ${userName}! We have a special mission - teaching computers to understand human emotions. Are you ready to become an Emotion Detective?`}
                  mood="excited"
                />
                
                <button
                  onClick={() => nextChapter(1)}
                  className="group bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 focus:bg-blue-800 shadow transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  Accept Mission
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {currentChapter === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Chapter 1: The Mystery of Feelings</h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-6">
                <SparkAI 
                  message="Let me tell you a secret - feelings have a special name in our detective work. We call them 'SENTIMENT'! But what exactly does that mean?"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-3">😊</div>
                    <h3 className="font-bold text-green-800 mb-2">Happy Sentiment</h3>
                    <p className="text-green-700 text-sm">Words like: amazing, wonderful, love, great!</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-3">😐</div>
                    <h3 className="font-bold text-blue-800 mb-2">Neutral Sentiment</h3>
                    <p className="text-blue-700 text-sm">Words like: okay, fine, normal, average</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-3">😞</div>
                    <h3 className="font-bold text-red-800 mb-2">Sad Sentiment</h3>
                    <p className="text-red-700 text-sm">Words like: terrible, awful, hate, bad</p>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => nextChapter(2)}
                    className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 focus:bg-purple-800 shadow transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Brain className="w-5 h-5" />
                    Got it! What's next?
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentChapter === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Chapter 2: The Art of Analysis</h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-6">
                <SparkAI 
                  message="Now that you know about sentiment, let's learn about ANALYSIS! It's like being a detective who examines clues very carefully."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <Eye className="w-6 h-6 text-purple-600" />
                      What is Analysis?
                    </h3>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <p className="text-gray-700">Analysis means looking at something very carefully to understand it better - like examining evidence at a crime scene!</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <Target className="w-6 h-6 text-pink-600" />
                      Detective Steps
                    </h3>
                    <div className="space-y-3">
                      {[
                        "🔍 Find the clues (words)",
                        "📝 Write them down", 
                        "🤔 Think about what they mean",
                        "✨ Solve the mystery!"
                      ].map((step, i) => (
                        <div key={i} className="bg-pink-50 p-3 rounded-xl flex items-center gap-3">
                          <span className="bg-pink-200 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-pink-800">{i+1}</span>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => nextChapter(3)}
                    className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 focus:bg-pink-800 shadow transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Zap className="w-5 h-5" />
                    I'm ready to combine them!
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentChapter === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Chapter 3: The Ultimate Detective Skill</h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-6">
                <SparkAI 
                  message="Amazing work, Detective! Now we combine both powers: SENTIMENT + ANALYSIS = SENTIMENT ANALYSIS! This is your superpower to understand emotions!"
                  mood="excited"
                />

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-2xl font-bold">
                      <div className="bg-blue-200 px-6 py-3 rounded-full text-blue-800">SENTIMENT</div>
                      <span className="text-purple-600">+</span>
                      <div className="bg-purple-200 px-6 py-3 rounded-full text-purple-800">ANALYSIS</div>
                      <span className="text-green-600">=</span>
                      <div className="bg-pink-200 text-pink-700 px-6 py-3 rounded-full">SENTIMENT ANALYSIS</div>
                    </div>
                    
                    <div className="bg-yellow-100 p-6 rounded-xl border-2 border-yellow-300">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Your Detective Mission</h3>
                      <p className="text-gray-700 text-lg">Help computers understand how people are feeling by examining their words and expressions!</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => nextChapter(4)}
                    className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 focus:bg-green-800 shadow transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Heart className="w-5 h-5" />
                    Let's solve our first case!
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentChapter === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Chapter 4: Your First Case</h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-6">
                <SparkAI 
                  message="Detective, we've received mysterious messages from a restaurant! Can you analyze these customer reviews and figure out their emotions? Each correct answer earns you detective points!"
                  mood={
                    (["review1", "review2", "review3"] as ReviewId[]).some(
                      id => reviewAnswers[id] && reviewAnswers[id] !== correctAnswers[id]
                    )
                      ? "sad"
                      : "excited"
                  }
                />

                <div className="grid gap-6">
                  {[
                    {
                      id: 'review1',
                      name: 'John Smith',
                      avatar: 'J',
                      color: 'from-blue-500 to-blue-600',
                      text: 'The food was amazing! Best restaurant I\'ve been to in months. The service was excellent and the atmosphere was perfect.',
                      correct: 'positive'
                    },
                    {
                      id: 'review2', 
                      name: 'Maria Garcia',
                      avatar: 'M',
                      color: 'from-red-500 to-red-600',
                      text: 'Terrible experience. The staff was rude and the food took forever to arrive. Won\'t be coming back.',
                      correct: 'negative'
                    },
                    {
                      id: 'review3',
                      name: 'David Lee', 
                      avatar: 'D',
                      color: 'from-green-500 to-green-600',
                      text: 'It was okay. The food was decent but nothing special. Prices were reasonable though.',
                      correct: 'neutral'
                    }
                  ].map((review) => (
                    <div key={review.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative">
                      {getReviewFeedback(review.id as ReviewId) !== null && (
                        <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
                          getReviewFeedback(review.id as ReviewId) ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                        }`}>
                          {getReviewFeedback(review.id as ReviewId) ? '✓' : '✗'}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${review.color} rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                          {review.avatar}
                        </div>
                        <div className="font-bold text-gray-800 text-lg">{review.name}</div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 text-base leading-relaxed bg-gray-50 p-4 rounded-xl">
                        "{review.text}"
                      </p>
                      
                      <div className="flex gap-3">
                        {[
                          { type: 'positive', label: '😊 Happy', color: 'green' },
                          { type: 'neutral', label: '😐 Neutral', color: 'blue' },
                          { type: 'negative', label: '😞 Sad', color: 'red' }
                        ].map((option) => (
                          <button
                            key={option.type}
                            onClick={() => handleAnswerSelect(review.id as ReviewId, option.type)}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 border-2 ${
                              reviewAnswers[review.id as ReviewId] === option.type
                                ? `bg-${option.color}-100 border-${option.color}-400 text-${option.color}-700 shadow-lg transform scale-105`
                                : `border-gray-200 hover:border-${option.color}-300 hover:bg-${option.color}-50`
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={() => nextChapter(5)}
                    className="bg-yellow-500 text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-600 focus:bg-yellow-700 shadow transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-5 h-5" />
                    
                    Case solved! What's next?
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentChapter === 5 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Chapter 5: Inside the Computer's Mind</h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-6">
                <SparkAI 
                  message="Excellent detective work! Now let me show you exactly how I (and other computers) learn to understand emotions. It's like teaching a robot to be a detective!"
                />

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-blue-600" />
                    The Computer's Detective Process
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h4 className="font-bold text-blue-800 mb-2">Step 1: Word Detective 🔍</h4>
                        <p className="text-gray-700 text-sm">I scan through all the words looking for emotion clues!</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h4 className="font-bold text-purple-800 mb-2">Step 2: Emotion Sorting 📚</h4>
                        <p className="text-gray-700 text-sm">I group similar feeling words together in my memory.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h4 className="font-bold text-green-800 mb-2">Step 3: Emotion Counting 🧮</h4>
                        <p className="text-gray-700 text-sm">I count how many happy, sad, or neutral words I found.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h4 className="font-bold text-orange-800 mb-2">Step 4: Final Decision 🎯</h4>
                        <p className="text-gray-700 text-sm">I pick the emotion with the most evidence!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">🤖 Computer's Emotion Dictionary</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-green-200 p-2 rounded text-green-800 text-center">
                        <div className="font-bold">Happy Words</div>
                        <div>amazing, great, love, perfect</div>
                      </div>
                      <div className="bg-blue-200 p-2 rounded text-blue-800 text-center">
                        <div className="font-bold">Neutral Words</div>
                        <div>okay, fine, decent, normal</div>
                      </div>
                      <div className="bg-red-200 p-2 rounded text-red-800 text-center">
                        <div className="font-bold">Sad Words</div>
                        <div>terrible, awful, bad, hate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => nextChapter(6)}
                    className="bg-cyan-600 text-white px-8 py-3 rounded-full font-bold hover:bg-cyan-700 focus:bg-cyan-800 shadow transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Brain className="w-5 h-5" />
                    Teach me about tricky words!
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentChapter === 6 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Chapter 6: The Sneaky "Not" Mystery</h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-6">
                <SparkAI 
                  message={`${userName}, here's where it gets tricky! Sometimes people use the word "not" and it flips the meaning completely. It's like a detective plot twist!`}
                  mood="excited"
                />

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎭 The Great Word Flip!</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-transform">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🔄</div>
                        <div className="font-bold text-green-700">"not bad"</div>
                        <div className="text-sm text-gray-600">actually means</div>
                        <div className="font-bold text-green-600">GOOD! ✨</div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-transform">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🔄</div>
                        <div className="font-bold text-red-700">"not good"</div>
                        <div className="text-sm text-gray-600">actually means</div>
                        <div className="font-bold text-red-600">BAD! 😞</div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-transform">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🔄</div>
                        <div className="font-bold text-purple-700">"not terrible"</div>
                        <div className="text-sm text-gray-600">actually means</div>
                        <div className="font-bold text-blue-600">OKAY! 👍</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3 text-center">🤖 How I Handle "Not" Words</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                        <span className="font-medium">1. Find the "not"</span>
                        <span className="text-purple-600">🔍</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                        <span className="font-medium">2. Look at next word</span>
                        <span className="text-blue-600">👀</span>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                        <span className="font-medium">3. Flip the meaning</span>
                        <span className="text-green-600">🔄</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => nextChapter(7)}
                    className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 focus:bg-orange-800 shadow transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Target className="w-5 h-5" />
                    Show me face reading!
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentChapter === 7 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Chapter 7: Reading Faces Like a Pro</h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-6">
                <SparkAI 
                  message="Detective, you've mastered words! Now let's learn the ultimate skill - reading emotions from faces. Humans show their feelings through facial expressions, and I can learn to see them too!"
                />

                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">👁️ The Face Detective Guide</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-md">
                      <div className="text-center space-y-3">
                        <img src="/happy.jpg" alt="" className="rounded-lg" />
                        <h4 className="font-bold text-green-700">Happy Face</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>👁️ Bright, wide eyes</div>
                          <div>👄 Curved up mouth</div>
                          <div>😊 Raised cheeks</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl shadow-md">
                      <div className="text-center space-y-3">
                        <img src="/neutral.jpg" alt="" className="rounded-lg" />
                        <h4 className="font-bold text-blue-700">Neutral Face</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>👁️ Normal eyes</div>
                          <div>👄 Straight mouth</div>
                          <div>😐 Relaxed features</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl shadow-md">
                      <div className="text-center space-y-3">
                        <img src="/angry.jpg" alt="" className="rounded-lg" />
                        <h4 className="font-bold text-red-700">Angry Face</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>👁️ Narrow eyes</div>
                          <div>👄 Tight or down mouth</div>
                          <div>😠 Furrowed brows</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                    <h4 className="font-bold text-yellow-800 mb-3 text-center">🤖 My Face Reading Process</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
                      <div className="bg-white p-2 rounded text-center">
                        <div className="font-bold text-purple-700">Step 1</div>
                        <div>Find the face</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center">
                        <div className="font-bold text-blue-700">Step 2</div>
                        <div>Locate features</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center">
                        <div className="font-bold text-green-700">Step 3</div>
                        <div>Measure angles</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center">
                        <div className="font-bold text-orange-700">Step 4</div>
                        <div>Compare patterns</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center">
                        <div className="font-bold text-red-700">Step 5</div>
                        <div>Identify emotion</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => nextChapter(8)}
                    className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 focus:bg-teal-800 shadow transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Star className="w-5 h-5" />
                    Complete my training!
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {currentChapter === 8 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">🎓 Congratulations, Detective {userName}!</h2>
                <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>

              <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-6 text-center">
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <Star className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Emotion Detective Academy Graduate!
                  </h3>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-gray-800 mb-3">🏆 Your Detective Skills</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg">✅ Understanding sentiment in text</div>
                      <div className="bg-white p-3 rounded-lg">✅ Teaching computers to analyze emotions</div>
                      <div className="bg-white p-3 rounded-lg">✅ Handling tricky "not" words</div>
                      <div className="bg-white p-3 rounded-lg">✅ Reading emotions from faces</div>
                    </div>
                  </div>
                  
                  <SparkAI 
                    message={`Amazing work, Detective ${userName}! You've earned ${detectivePoints} detective points and mastered sentiment analysis. Now you know how to help computers understand human emotions - a superpower that makes technology more helpful and understanding!`}
                    mood="excited"
                  />
                  
                  <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4">
                    <p className="text-gray-700 font-medium">
                      🌟 You can now help computers understand feelings in social media, customer reviews, 
                      chatbots, and even help build technology that's more empathetic and human-friendly!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setShowNameInput(true);
                      setCurrentChapter(0);
                      setDetectivePoints(0);
                      setUserName("");
                      setReviewAnswers({ review1: null, review2: null, review3: null });
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 focus:bg-blue-800 shadow transition-all duration-300"
                  >
                    Train Another Detective
                  </button>
                  <button
                    onClick={() => {
                      setCurrentChapter(0);
                      setDetectivePoints(0);
                      setReviewAnswers({ review1: null, review2: null, review3: null });
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 focus:bg-green-800 shadow transition-all duration-300"
                  >
                    Start Fresh Adventure
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}