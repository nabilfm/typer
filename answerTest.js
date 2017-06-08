/**
 * Created by nabilfm on 6/4/2017.
 */
var Test = {
    satu: {
        Q: 'Sebutkan library apa saja yang dipakai, website library itu dimana, dan dokumentasi library itu ada dimana.',
        A: {
            satu: {
                info: 'Backbone',
                type: 'JS',
                versi: '1.1.2',
                website: 'http://backbonejs.org',
                docs: 'http://backbonejs.org/docs/backbone.html'
            },
            dua: {
                info: 'Bootstrap',
                type: 'CSS',
                versi: '3.1.1',
                website: 'http://getbootstrap.com/css/',
                docs: 'http://bootstrapdocs.com/v3.1.1/docs/css/'
            },
            tiga: {
                info: 'JQuery',
                type: 'JS',
                versi: '1.11.1',
                website: 'http://jquery.com/',
                docs: 'https://api.jquery.com/'
            },
            empat: {
                info: 'JQuery UI',
                type: 'CSS with JS included',
                versi: '1.10.4',
                website: 'http://jquery.com/',
                docs: 'https://api.jquery.com/'
            },
            lima: {
                info: 'Underscore',
                type: 'JS',
                versi: '1.6.0',
                website: 'http://underscorejs.org',
                docs: 'http://devdocs.io/underscore/'
            }
        }
    },
    dua: {
        Q: 'Aplikasi itu \'laggy\'. Kenapa? Bagaimana cara membuat animasi lebih \'smooth\'?',
        A: 'Aplikasi tersebut \'laggy\' karena delay pada fungsi interval untuk menggeser kata2, terlalu besar. agar animasi lebih smooth, value dirubah menjadi lebih kecil dari 100 (diusahakan kurang dari setengahnya, yaitu 30) ' +
            'https://github.com/nabilfm/typer/commit/422a378f5ca3a66090e7bf11cc67eedacc160237'
    },
    tiga: {
        Q: 'Aplikasi itu tidak akan jalan di salah satu 3 browser populer (Chrome, Firefox, Internet Explorer)? Kenapa? Solusinya hanya menghapus satu character di code, character yang mana?',
        A: 'Character yang perlu dihapus adalah ","(baca: koma) pada line 141 (original code typer) setelah max_speed: 5' +
            'https://github.com/nabilfm/typer/commit/7a7b047b7c77f81668582cb65ea67b8a1a43b996'
    },
    empat: {
        Q: 'Implementasikan tombol Start, Stop, Pause, dan Resume.Lihat implementasinya dengan cara menjalankan aplikasi.',
        A: 'https://github.com/nabilfm/typer/commit/f8ae536e402c2dc2d006128355e9aff202a22bcd' +
            'https://github.com/nabilfm/typer/commit/5f656c8d082a671d0ba9d9efbbe54336e6097df1'
    },
    lima: {
        Q: 'Ketika ukuran window dirubah, susunan huruf yang \'terbentur\' batas window menjadi tidak 1 baris. Benarkan.',
        A: 'https://github.com/nabilfm/typer/commit/b066758a88d8644d78765b2cf0c6515e94c44cdc'
    },
    enam: {
        Q: 'Implementasikan sistem score.',
        A: 'https://github.com/nabilfm/typer/commit/d80df491432b9b101600fe5457dcf0caac2689d0'
    },
    tujuh: {
        Q: 'Implementasikan hukuman berupa pengurangan nilai bila salah ketik.',
        A: 'https://github.com/nabilfm/typer/commit/492a0dc55ffc5d95a5f86e7b1ced9992ebbe6c76'
    }
}
