const pokeballs = document.querySelectorAll(".pokeball");
        const backgrounds = [
            './assets/forest.webp',
            'background2.jpg',
            'background3.jpg',
            'background4.jpg'
        ];

        function switchBackground() {
            const background1 = document.querySelector('.background-1');
            const background2 = document.querySelector('.background-2');
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            background1.style.backgroundImage = `url('./assets/battleback${randomIndex+1}-1.png')`;
            background2.style.backgroundImage = `url('./assets/battleback${randomIndex+1}-2.png')`;
        }

        switchBackground();