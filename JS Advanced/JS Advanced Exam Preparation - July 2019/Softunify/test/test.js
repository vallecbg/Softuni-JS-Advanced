const SoftUniFy = require('../SoftUniFy.js')
let expect = require("chai").expect;
let assert = require("chai").assert;

describe("Test", function () {
    let softunify;
    this.beforeEach(function () {
        softunify = new SoftUniFy();
    })

    it("Should create instance", function () {
        expect(softunify.allSongs).to.deep.equal({});
        //TODO: check songslist get
        expect(softunify.songsList).to.equal('Your song list is empty');
    })

    it("Should have instance type", function () {
        expect(SoftUniFy.prototype).to.have.property('downloadSong');
        expect(SoftUniFy.prototype).to.have.property('playSong');
        expect(SoftUniFy.prototype).to.have.property('rateArtist');
    })
})

describe("Constructor tests", function () {
    it('Download song and create new artist', function () {
        let softunify = new SoftUniFy();
        let result = softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        expect(softunify.allSongs).to.be.deep.equal({
            Eminem: {
                rate: 0,
                votes: 0,
                songs: ['Venom - Knock, Knock let the devil in...']
            }
        });
        expect(result).to.be.deep.equal({
            allSongs: {
                Eminem: {
                    rate: 0,
                    votes: 0,
                    songs: ['Venom - Knock, Knock let the devil in...']
                }
            }
        });
    })

    it("Download song with already created artist", function () {
        let softunify = new SoftUniFy();
        softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        let result = softunify.downloadSong('Eminem', 'asdasd', 'adasdsd');
        expect(result).to.be.deep.equal({
            allSongs: {
                Eminem: {
                    rate: 0,
                    votes: 0,
                    songs: ['Venom - Knock, Knock let the devil in...', 'asdasd - adasdsd']
                }
            }
        });
        expect(softunify.allSongs).to.be.deep.equal({
            Eminem: {
                rate: 0,
                votes: 0,
                songs: ['Venom - Knock, Knock let the devil in...',
                    'asdasd - adasdsd'
                ]
            }
        });
    })

    it('Download many songs', function () {
        let softunify = new SoftUniFy();

        softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        softunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
        softunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

        expect(softunify.allSongs).to.be.deep.equal({
            Eminem: {
                rate: 0,
                votes: 0,
                songs: ['Venom - Knock, Knock let the devil in...',
                    'Phenomenal - IM PHENOMENAL...'
                ]
            },
            'Dub Fx': {
                rate: 0,
                votes: 0,
                songs: ['Light Me On Fire - You can call me a liar.. ']
            }
        });

    })

    it("Play song", function () {
        let softunify = new SoftUniFy();

        softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        let result = softunify.playSong("Venom");

        expect(result).to.be.equal(`Eminem:\nVenom - Knock, Knock let the devil in...\n`)
    })

    it("Play song not downloaded", function () {
        let softunify = new SoftUniFy();

        let result = softunify.playSong("Kondio");
        expect(result).to.be.equal("You have not downloaded a Kondio song yet. Use SoftUniFy's function downloadSong() to change that!");
    })

    it("Get songslist when there are no downloaded songs", function () {
            let softunify = new SoftUniFy();
            let result = softunify.songsList;
            expect(result).to.be.equal("Your song list is empty");
        }),

        it("Get songlist of many downloaded songs", function () {
            let softunify = new SoftUniFy();

            softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            softunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
            softunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

            let result = softunify.songsList;
            expect(result).to.be.equal(`Venom - Knock, Knock let the devil in...\nPhenomenal - IM PHENOMENAL...\nLight Me On Fire - You can call me a liar.. `);
        })

    it("Rate artist not found", function () {
        let softunify = new SoftUniFy();

        let result = softunify.rateArtist("Kondio", 50);
        expect(result).to.be.equal("The Kondio is not on your artist list.");
    })

    it("Rate artist with one argument", function () {
        let softunify = new SoftUniFy();
        softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        let result = softunify.rateArtist("Eminem");

        expect(result).to.be.equal(0);
    })

    it("Rate artist with two arguments", function () {
        let softunify = new SoftUniFy();
        softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        let result = softunify.rateArtist("Eminem", 50);

        expect(result).to.be.equal(50);
        expect(softunify.allSongs).to.be.deep.equal({
            Eminem: {
                rate: 50,
                votes: 1,
                songs: ['Venom - Knock, Knock let the devil in...']
            }
        });
    })
})