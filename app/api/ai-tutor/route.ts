import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, wrongCount, ageTier, mascotName = 'kelinci' } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Kamu adalah mascot ${mascotName} yang ramah untuk anak Indonesia usia ${ageTier}. Anak baru saja mencoba materi ${topic} dan salah ${wrongCount} kali. Berikan 1 kalimat hint atau dorongan semangat hangat yang sangat mudah dipahami anak tanpa menggunakan kata "salah". Maksimal 20 kata.`
            }]
          }]
        })
      });
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return NextResponse.json({ hint: text });
      }
    }

    // Fallback dialogue generator
    const fallbacks: Record<string, string[]> = {
      math: [
        `Yuk coba hitung pelan-pelan pakai jari tanganmu! 🖐️ Kamu pasti bisa!`,
        `Ingat, kalau ditambah artinya bendanya jadi makin banyak ya! 🌟`,
        `Ayo ${mascotName} bantu hitung dari angka 1 yuk! 💪`
      ],
      reading: [
        `Coba bunyikan hurufnya satu-satu ya! 🔤 Kamu hebat!`,
        `Dengarkan suara dari huruf pertama, yuk tebak bersama! 🌟`,
        `Hurufnya lucu banget ya, ayo kita rangkai kata ini! 📖`
      ],
      science: [
        `Coba perhatikan warna dan bentuk gambarnya ya! 🌍`,
        `Alam itu indah banget, yuk cari tahu jawabannya! 🌟`,
        `Hewan ini bersuara lucu lho, ayo tebak lagi! 🐾`
      ],
      general: [
        `Wah sedikit lagi hampir tepat! Yuk coba pilih yang satu lagi! 🌟`,
        `Semangat terus! ${mascotName} yakin kamu pasti bisa! 💪`,
        `Jangan menyerah ya, anak hebat selalu mencoba lagi! ✨`
      ]
    };

    const topicKey = topic?.toLowerCase().includes('math') || topic?.toLowerCase().includes('angka') ? 'math' :
                     topic?.toLowerCase().includes('read') || topic?.toLowerCase().includes('huruf') ? 'reading' :
                     topic?.toLowerCase().includes('sci') || topic?.toLowerCase().includes('sains') ? 'science' : 'general';

    const options = fallbacks[topicKey] || fallbacks.general;
    const randomHint = options[Math.floor(Math.random() * options.length)];

    return NextResponse.json({ hint: randomHint });

  } catch {
    return NextResponse.json({ hint: 'Semangat terus ya anak pintar! Kamu pasti bisa! 🌟' });
  }
}
