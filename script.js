const image = new Image();
image.src='Capture.PNG'

image.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;

    let particlesArray = [];
    const numberOfParticles = 10000;
    const detail = 1;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let grid = [];
    for (let y = 0; y < canvas.height; y += detail){
        let row = [];
        for (let x = 0; x < canvas.width; x += detail){
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            const color = 'rgb(' + red +',' + green + ',' + blue + ')';
            const brightness = calculateBrightness(red, green, blue)/100;
            const cell = [
                cellBrightness = brightness,
            ];
            row.push(cell);
        }  
        grid.push(row); 
    }
    console.log(grid);

    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = 0;
            
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 2 + 0.5;
            this.position1 = Math.floor(this.y / detail);
            this.position2 = Math.floor(this.x / detail);
            
        }
        update () {
            this.position1 = Math.floor(this.y / detail);
            this.position2 = Math.floor(this.x / detail);
            if (grid[this.position1])
            {
                if (grid[this.position1][this.position2])
                {
                    this.speed = grid[this.position1][this.position2][0];
                }
            }
            this.angle += this.speed/20;
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement;
            this.x += 0;
            if (this.y >= canvas.height) {
                this.y = -1;
                this.x=Math.random() * canvas.width;
                
            }
            //console.log(this.x += movement)
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = 'black';
            if (this.y > canvas.height - this.size * 6) ctx.globalAlpha = 0;
            if (grid[this.position1]){
                if (grid[this.position1][this.position2]){
                    ctx.fillStyle = 'rgb(255,255,255)';
                }

            } else {
                ctx.fillStyle = 'white';
            }
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();

        }

        

    }

    function init()
    {
        for (let i = 0; i < numberOfParticles; i++)
        {
            particlesArray.push(new Particle());
        }
    }
    init();
    var pause=false;
    function animate () 
    {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particlesArray.length; i++) 
        {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.3;
            particlesArray[i].draw();
        }
        if(!pause)
            requestAnimationFrame( animate );
    }
    animate();

    function calculateBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        );
    }

    const button1=document.getElementById('button1');
    button1.addEventListener('mouseover',function(){
        button1.style.background="grey";
    });

    button1.addEventListener('mouseout',function(){
        button1.style.background="white";
    });

    button1.addEventListener('click',function(){
        if(button1.textContent==="Pause")
        {
            button1.textContent="Play";
            pause=true;
        }
        else
        {
            button1.textContent="Pause";
            pause=false;
            animate();
        }
    });

});
