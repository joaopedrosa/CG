/*global THREE*/

var camera, camera2,scene, renderer;
var clock;
var ncamera=1;
var bullet;

var objects=new Array();
var shots=new Array();
var dirLightList= new Array();
var pointLightList=new Array();
var squarelist=new Array();
var vidas=0
var overlist=new Array();
var winlist=new Array();
var pflag=1, bflag=1, sun=0, sol, Light=0, farol=0, luz, pause=0,square,lose=0,over,won=0;
var Cubojogo;
var redPoint;
var group;
var score,vidatotal;

var vertices = [//cubo grabde
 new THREE.Vector3(-5,-2.5,-2.5),
 new THREE.Vector3(-5,2.5,-2.5),
 new THREE.Vector3(5,-2.5,-2.5),
 new THREE.Vector3(5,2.5,-2.5),
 new THREE.Vector3(-5,-2.5,2.5),
 new THREE.Vector3(-5,2.5,2.5),
 new THREE.Vector3(5,-2.5,2.5),
 new THREE.Vector3(5,2.5,2.5),

//cubo pequeno
 new THREE.Vector3(-1.5,-1.5,-1.5),
 new THREE.Vector3(-1.5,1.5,-1.5),
 new THREE.Vector3(1.5,-1.5,-1.5),
 new THREE.Vector3(1.5,1.5,-1.5),
 new THREE.Vector3(-1.5,-1.5,1.5),
 new THREE.Vector3(-1.5,1.5,1.5),
 new THREE.Vector3(1.5,-1.5,1.5),
 new THREE.Vector3(1.5,1.5,1.5),

 //piramide direita
 new THREE.Vector3(-2.5, -0.875, -0.875),
 new THREE.Vector3(-2.5, 0.875, -0.875),
 new THREE.Vector3(2.5, -2.5, -2.5),
 new THREE.Vector3(2.5, 2.5, -2.5),
 new THREE.Vector3(-2.5, -0.875, 0.875),
 new THREE.Vector3(-2.5, 0.875, 0.875),
 new THREE.Vector3(2.5, -2.5, 2.5),
 new THREE.Vector3(2.5, 2.5, 2.5),

 //piramide esquerda
 new THREE.Vector3(-2.5, -2.5, -2.5),
 new THREE.Vector3(-2.5, 2.5, -2.5),
 new THREE.Vector3(2.5, -0.875, -0.875),
 new THREE.Vector3(2.5, 0.875, -0.875),
 new THREE.Vector3(-2.5, -2.5, 2.5),
 new THREE.Vector3(-2.5, 2.5, 2.5),
 new THREE.Vector3(2.5, -0.875, 0.875),
 new THREE.Vector3(2.5, 0.875, 0.875),

 //paralelipipedo
 new THREE.Vector3(-3,-0.5,-0.5),
 new THREE.Vector3(-3,0.5,-0.5),
 new THREE.Vector3(3,-0.5,-0.5),
 new THREE.Vector3(3,0.5,-0.5),
 new THREE.Vector3(-3,-0.5,0.5),
 new THREE.Vector3(-3,0.5,0.5),
 new THREE.Vector3(3,-0.5,0.5),
 new THREE.Vector3(3,0.5,0.5)];

var nave, basic, gouraud, pointlight, dirlight, objectsListTemp, shotsListTemp, triangles;
class Objectos extends THREE.Object3D{
	constructor(name,x,y,z,material,max){
		super();
		this.position.x=x;
		this.position.y=y;
		this.position.z=z;
		this.material=material;
		this.max=max;
	}
	addCube(x,y,z,xsize,ysize,zsize,rotx,roty,rotz){
		var geometry=new THREE.CubeGeometry(xsize,ysize,zsize);
		var mesh=new THREE.Mesh(geometry, this.material);
		if(rotz!=0)
			mesh.rotation.z=rotz;
		if(rotx!=0)
			mesh.rotation.x=rotx;
		if(roty!=0)
			mesh.rotation.y=roty;
		mesh.position.set(x, y, z);
		this.add(mesh);
	}
	addBall(x,y,z,p1,p2,p3){
		var geometry=new THREE.SphereGeometry(p1, p2, p3);
		var mesh=new THREE.Mesh(geometry, this.material);
		mesh.position.set(x, y, z);
		this.add(mesh);
	}
	addPyramid(x,y,z,xx,yy,zz,rr,d){
	 'use strict';
	 var geometry=new THREE.CylinderGeometry(xx,yy,zz,rr);
	 var mesh=new THREE.Mesh(geometry, this.material);
	 if (d==1)
	  mesh.rotation.z=Math.PI / 2;
	 else if (d==2)
	  mesh.rotation.z=-Math.PI / 2;
	 mesh.rotation.x=Math.PI / 4;
	 mesh.position.set(x, y, z);
	 this.add(mesh);
}

	addPart(material, x, y ,z, vx, vy, vz){
		var geometry = new THREE.Geometry();
		geometry.vertices = vertices;
		geometry.faces.push(new THREE.Face3(vx, vy, vz));
		geometry.computeFaceNormals();
		geometry.mergeVertices();
		var mesh = new THREE.Mesh(geometry, this.material);
		mesh.position.set(x, y, z);
		this.add(mesh);
	}
	addSquare(x,y,z, xx,yy,zz,r){
		var imagem = THREE.ImageUtils.loadTexture("pause.jpg");
		var geometry = new THREE.CubeGeometry( xx,yy,zz);
		var material = new THREE.MeshBasicMaterial();
		material.map=imagem;
		var mesh = new THREE.Mesh( geometry, material);
		if(r==1)
			mesh.rotation.x=Math.PI/2;
		if(r==2)
			mesh.rotation.y=Math.PI/2;
		if(r==3)
			mesh.rotation.z=Math.PI;
		mesh.position.set(x,y,z);
		this.add(mesh);
	}
	addOver(x,y,z, xx,yy,zz,r){
		var imagem = THREE.ImageUtils.loadTexture("gameover2.jpg");
		var geometry = new THREE.CubeGeometry( xx,yy,zz);
		var material = new THREE.MeshBasicMaterial();
		material.map=imagem;
		var mesh = new THREE.Mesh( geometry, material);
		if(r==1)
			mesh.rotation.x=Math.PI/2;
		if(r==2)
			mesh.rotation.y=Math.PI/2;
		if(r==3)
			mesh.rotation.z=Math.PI;
		mesh.position.set(x,y,z);
		this.add(mesh);
	}
	addTexture(x,y,z){
			var imagem = THREE.ImageUtils.loadTexture("space2.jpg");
			var geometry = new THREE.SphereGeometry(150,150,150);
  			var mesh = new THREE.MeshBasicMaterial();
  			mesh.map = imagem;
			var mesh = new THREE.Mesh( geometry,mesh );
			mesh.material.side = THREE.DoubleSide;
			mesh.material.map.wrapS=THREE.RepeatWrapping;
			mesh.material.map.wrapT = THREE.RepeatWrapping;
  			mesh.material.map.repeat.set( 5, 3);
  			group.add( mesh );
			mesh.position.set(x, y, z);
	}
	addScore(x,y,z,xx,yy,zz,n){
			if(n==0)
				var imagem = THREE.ImageUtils.loadTexture("score0.png");
			else if(n==1)
				var imagem = THREE.ImageUtils.loadTexture("score10.png");
			else if(n==2)
				var imagem = THREE.ImageUtils.loadTexture("score20.png");
			else if(n==3)
				var imagem = THREE.ImageUtils.loadTexture("score30.png");
			else if(n==4)
				var imagem = THREE.ImageUtils.loadTexture("score40.png");
			else if(n==5)
				var imagem = THREE.ImageUtils.loadTexture("score50.png");
			else if(n==6)
				var imagem = THREE.ImageUtils.loadTexture("score60.png");
			else if(n==7)
				var imagem = THREE.ImageUtils.loadTexture("score70.png");
			else if(n==8)
				var imagem = THREE.ImageUtils.loadTexture("score80.png");
			var geometry = new THREE.CubeGeometry(xx,yy,zz);
  			var mesh = new THREE.MeshBasicMaterial();
  			mesh.map = imagem;
			var mesh = new THREE.Mesh( geometry,mesh );
  			group.add( mesh );
			mesh.position.set(x, y, z);
	}
	addLife(x,y,z,xx,yy,zz,n){
		if(n==0)
			var imagem = THREE.ImageUtils.loadTexture("Lives0.png");
		else if(n==1)
			var imagem = THREE.ImageUtils.loadTexture("Lives1.png");
		else if(n==2)
			var imagem = THREE.ImageUtils.loadTexture("Lives2.png");
		else if(n==3)
			var imagem = THREE.ImageUtils.loadTexture("Lives3.png");
		var geometry = new THREE.CubeGeometry(xx,yy,zz);
  		var mesh = new THREE.MeshBasicMaterial();
  		mesh.map = imagem;
		var mesh = new THREE.Mesh( geometry,mesh );
  		group.add( mesh );
		mesh.position.set(x, y, z);
	}
	addWin(x,y,z, xx,yy,zz,r){
		var spacetex = THREE.ImageUtils.loadTexture("win2.png");
		var geometry = new THREE.CubeGeometry( xx,yy,zz);
		var material = new THREE.MeshBasicMaterial();
		material.map=spacetex;
		var mesh = new THREE.Mesh( geometry, material);
		if(r==1)
			mesh.rotation.x=Math.PI/2;
		if(r==2)
			mesh.rotation.y=Math.PI/2;
		if(r==3)
			mesh.rotation.z=Math.PI;
		mesh.position.set(x,y,z);
		this.add(mesh);
	}
}

class Ship extends Objectos{
	constructor(x,y,z,material){
		var max=50;
		var speed=0;
		var acelaracao,esquerda,direita;
		super('Ship',x,y,z,material,max);

		// ---------------- Cubo Grande ---------------
		this.addPart(material, 0, 0, 0, 0, 1, 2);
		this.addPart(material, 0, 0, 0, 1, 3, 2);
		this.addPart(material, 0, 0, 0, 1, 3, 2); //extra for wireframe transverse

		this.addPart(material, 0, 0, 0, 4, 6, 5);
		this.addPart(material, 0, 0, 0, 5, 6, 7);

		this.addPart(material, 0, 0, 0, 1, 0, 4);
		this.addPart(material, 0, 0, 0, 1, 4, 5);

		this.addPart(material, 0, 0, 0, 0, 2, 4);
		this.addPart(material, 0, 0, 0, 4, 2, 6);

		this.addPart(material, 0, 0, 0, 2, 3, 6);
		this.addPart(material, 0, 0, 0, 6, 3, 7);

		this.addPart(material, 0, 0, 0, 3, 1, 5);
		this.addPart(material, 0, 0, 0, 3, 5, 7);

		// -------------- Cubo Pequeno -----------------
		this.addPart(material, 0, 5, 0, 8, 9, 10);
		this.addPart(material, 0, 5, 0, 10, 9, 11);

		this.addPart(material, 0, 5, 0, 13, 12, 14);
		this.addPart(material, 0, 5, 0, 13, 14, 15);

		this.addPart(material, 0, 5, 0, 11, 9, 13);
		this.addPart(material, 0, 5, 0, 11, 13, 15);

		this.addPart(material, 0, 5, 0, 9, 8, 12);
		this.addPart(material, 0, 5, 0, 9, 12, 13);

		this.addPart(material, 0, 5, 0, 10, 11, 14);
		this.addPart(material, 0, 5, 0, 14, 11, 15);

		//--------------- Piramide Esquerda ------------
		this.addPart(material, -7.5, 0, 0, 16, 17, 18);
		this.addPart(material, -7.5, 0, 0, 18, 17, 19);

		this.addPart(material, -7.5, 0, 0, 21, 20, 22);
		this.addPart(material, -7.5, 0, 0, 21, 22, 23);

		this.addPart(material, -7.5, 0, 0, 19, 17, 21);
		this.addPart(material, -7.5, 0, 0, 21, 23, 22);

		this.addPart(material, -7.5, 0, 0, 16, 18, 20);
 		this.addPart(material, -7.5, 0, 0, 20, 18, 22);

		this.addPart(material, -7.5, 0, 0, 17, 16, 20);
		this.addPart(material, -7.5, 0, 0, 17, 20, 21);

		this.addPart(material, -7.5, 0, 0, 18, 19, 22);
		this.addPart(material, -7.5, 0, 0, 22, 19, 23);

		//--------------- Piramide Direita -----------
		this.addPart(material, 7.5, 0, 0, 24, 25, 26);
		this.addPart(material, 7.5, 0, 0, 26, 25, 27);

		this.addPart(material, 7.5, 0, 0, 29, 28, 30);
		this.addPart(material, 7.5, 0, 0, 29, 30, 31);

    	this.addPart(material, 7.5, 0, 0, 27, 25, 29);
    	this.addPart(material, 7.5, 0, 0, 29, 31, 30);

		this.addPart(material, 7.5, 0, 0, 24, 26, 28);
  		this.addPart(material, 7.5, 0, 0, 28, 26, 30);

		this.addPart(material, 7.5, 0, 0, 25, 24, 28);
		this.addPart(material, 7.5, 0, 0, 25, 28, 29);

		this.addPart(material, 7.5, 0, 0, 26, 27, 30);
		this.addPart(material, 7.5, 0, 0, 30, 27, 31);

		//--------------- Paralelipipedo ------------
		this.addPart(material, 0, 3, 0, 32, 33, 34);
		this.addPart(material, 0, 3, 0, 34, 33, 35);

		this.addPart(material, 0, 3, 0, 37, 36, 38);
		this.addPart(material, 0, 3, 0, 37, 38, 39);

		this.addPart(material, 0, 3, 0, 35, 33, 37);
		this.addPart(material, 0, 3, 0, 35, 37, 39);

		this.addPart(material, 0, 3, 0, 33, 32, 36);
		this.addPart(material, 0, 3, 0, 33, 36, 37);

		this.addPart(material, 0, 3, 0, 34, 35, 38);
		this.addPart(material, 0, 3, 0, 38, 35, 39);


		this.userData={speed,acelaracao,esquerda,direita};
		this.material;

	}
}
class Alien extends Objectos{
	constructor(x,y,z,material){
		var max = 0.4;
		var dx,dy,colision;
		super('Alien',x,y,z,material,max);
		this.addBall(0,0,0,2,10,10);
		this.addCube(4,0,0,2,7,2,Math.PI/2,0,0);
		this.addCube(-4,0,0,2,7,2,Math.PI/2,0,0);
		this.addCube(2.5,0,0,1,1,2,0,0,0);
		this.addCube(-2.5,0,0,1,1,2,0,0,0);
		this.userData={dx,dy,colision};
		this.material;
	}
}
class Bullet extends Objectos{
	constructor(x,y,z,material){
		var max=0.1;
		super('Bullet',x,y,z,material,max);
		this.addBall(0,0,0,1,10,10);
		this.material;
	}
}

class HelpCube extends Objectos{
	constructor(x,y,z){
		super('HelpCube', x,y,z);
		this.addTexture(x,y,z);
	}
}

class Pause extends Objectos{
	constructor(x,y,z,xx,yy,zz,r){
		super('Pause', x,y,z);
		this.addSquare(x,y,z,xx,yy,zz,r);

	}
}
class Over extends Objectos{
	constructor(x,y,z,xx,yy,zz,r){
		super('gameisover', x,y,z);
		this.addOver(x,y,z,xx,yy,zz,r);

	}
}

class Vida extends Objectos{
	constructor(x,y,z,n){
		super('Vidas',x,y,z);
		this.addLife(x,y,z,35,6,7,n)
  		this.material;

	}
}

class Score extends Objectos{
	constructor(x,y,z,n){
		super('score',x,y,z);
		this.addScore(x,y,z,22,6,7,n);
	}
}

class Win extends Objectos{
	constructor(x,y,z,xx,yy,zz,r){
		super('win', x,y,z);
		this.addWin(x,y,z,xx,yy,zz,r);

	}
}



// ------------------------------------------- Animate ------------------------------------------- //


function animate(){
	'use strict';
	if(vidas==0){
		pause=1;
		lose=1;
		showGameOver();
	}
	if(objects.length==0){
		pause=1;
		won=1;
		showWin();
	}
	if(pause==0){
	moveShip();
	var fimbalas=shots.length;
	var fimaliens=objects.length;
	for(var i=0; i<fimaliens;i++){
		fimbalas=shots.length;
		fimaliens=objects.length;
		if (i<fimaliens)
			moveAlien(objects[i]);
	}
	for(var i=0; i<fimbalas;i++){
		fimbalas=shots.length;
		fimaliens=objects.length;
		if( i<fimbalas)
			createShoot(shots[i],i);
	}
	for(var i=0; i<fimaliens;i++){
		for(var j=i+1; j<fimaliens;j++){
			fimbalas=shots.length;
			fimaliens=objects.length;
			if(i<fimaliens && j<fimaliens)
				handleAlienColision(objects[i], objects[j]);

		}

		for(var j =0;j<fimbalas;j++){
			fimbalas=shots.length;
			fimaliens=objects.length;
			if(i<fimaliens && j<fimbalas)
				handleBulletColision(objects[i], shots[j],i,j);

		}
		fimbalas=shots.length;
		fimaliens=objects.length;
		if(i<fimaliens)
			handleAlienNave(nave, objects[i]);
	}
}
else{
	if(squarelist.length==1)
		squarelist[0].rotation.z+=0.02;
	if(lose==1)
		over.rotation.z+=0.02;
	if(won==1)
		win.rotation.z+=0.02;
}
	
	render();


	requestAnimationFrame(animate);

}

function createOrthographicCamera(){
	'use strict';
	ncamera=1;
	var viewSize=60;
	var aspectRatio=window.innerWidth / window.innerHeight;
	if (aspectRatio >= 1) {
            camera = new THREE.OrthographicCamera( - viewSize * aspectRatio, viewSize * aspectRatio, viewSize, -viewSize, 0, 500 );
        }
     else{
            camera = new THREE.OrthographicCamera( - viewSize, viewSize, viewSize / aspectRatio, -viewSize / aspectRatio, 0, 500 );
        }

    camera.position.x =0;
	camera.position.y = 0;
	camera.position.z = 30;
	camera.lookAt(0,0,0);
	
	//var cameraOrthoHelper = new THREE.CameraHelper( camera );
	//scene.add( cameraOrthoHelper );
}

function create2ndCamera(){
	var viewSize=60;
	var aspectRatio=window.innerWidth / window.innerHeight;
	if (aspectRatio >= 1) {
            camera2 = new THREE.OrthographicCamera( - viewSize * aspectRatio, viewSize * aspectRatio, viewSize, -viewSize, 0, 2000 );
        }
    else{
            camera2 = new THREE.OrthographicCamera( - viewSize, viewSize, viewSize / aspectRatio, -viewSize / aspectRatio, 0, 2000 );
        }

    camera2.position.x =5000;
	camera2.position.y = 0;
	camera2.position.z = 5;
	camera2.lookAt(5000,0,0);
}


function createPerspectiveCamera(){
	'use strict';
	ncamera=2;
	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 15, 900 );
	camera.position.x = 0;
	camera.position.y = -85;
	camera.position.z = 40;
	camera.lookAt(scene.position);
}

function createPerspectiveCameraMov(){
	'use strict';
	ncamera=3;
	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 15, 900 );
	camera.position.x = 0;
	camera.position.y = -85;
	camera.position.z = 40;
	camera.lookAt(scene.position);
}



function createship(ship){
	'use strict';
	nave=ship;
	scene.add(ship);
}

function createalien(alien,i){
	'use strict'
		scene.add(alien);
	if(i==-1){
		objects.push(alien);
		createRandomDirection(objects[objects.length-1]);
	}
	objects[i]=alien;
}

function createShoot(bullet, i){
	bullet.position.y+=1;
	if(bullet.position.y>=59){
		scene.remove(bullet);
		shots.splice(i,1);
	}
}

function createBala(bala,i){
	if(i==-1){
		shots.push(bala);
	}
	shots[i]=bala;
	scene.add(bala);
}

function addHelpCube(cube){
	Cubojogo=cube;
	scene.add(cube);
}

// ------------------------------------------- Scene ------------------------------------------- //

function createScene(){
	'use strict';

	scene=new THREE.Scene();
	group = new THREE.Group();
	scene.add( group);
	//scene.add(new THREE.AxisHelper(10));
	objects=[];shots=[];dirLightList=[];pointLightList=[];squarelist=[];overlist=[];winlist=[];
	ncamera=1;
	pflag=1; bflag=1; sun=0; Light=0; farol=0; pause=0;lose=0;vidas=3;won=0;

	createDirecionalLight();
	scene.add(new HelpCube(0,0,0));
	createVida(4940,-57,0,3);
	
	var shipmaterial = new THREE.MeshBasicMaterial({ color: 0x009900, wireframe: true});
	var alienmaterial = new THREE.MeshBasicMaterial({ color: 0x333399, wireframe: true});
	createship(new Ship(0,-50,0,shipmaterial));
	createScore(new Score(5060,-57,0,0));


	createalien(new Alien(-45,30,0,alienmaterial),-1);
	createalien(new Alien(-15,30,0,alienmaterial),-1);
	createalien(new Alien(15,30,0,alienmaterial),-1);
	createalien(new Alien(45,30,0,alienmaterial),-1);


	createalien(new Alien(-45,15,0,alienmaterial),-1);
	createalien(new Alien(-15,15,0,alienmaterial),-1);
	createalien(new Alien(15,15,0,alienmaterial),-1);
	createalien(new Alien(45,15,0,alienmaterial),-1);
	//addHelpCube(new HelpCube(0,0,-15, new THREE.MeshBasicMaterial({ color: 0xffffff})));
}

function createScore(tscore){
	score=tscore;
	scene.add(score);
}

function handleBulletColision(alien,bullet,i,j){
	if((alien.position.x-5 <= bullet.position.x+1 && alien.position.x+5 >= bullet.position.x-1) &&
 		(alien.position.y-2 <= bullet.position.y+1 && alien.position.y+2 >= bullet.position.y-1)){
			scene.remove(bullet);
			shots.splice(j,1);
			scene.remove(alien);
			objects.splice(i,1);
			scene.remove(score);
			createScore(new Score(5060,-57,0,(objects.length-8)*-1));
	}
}

function handleAlienColision(alien1, alien2){
	if((alien1.position.x-4.5 <= alien2.position.x+4.5 && alien1.position.x+4.5 >= alien2.position.x-4.5) &&
 		(alien1.position.y-1.5 <= alien2.position.y+1.5 && alien1.position.y+1.5 >= alien2.position.y-1.5)){
			alien1.userData.dx=alien1.userData.dx*(-1);
			alien1.userData.dy=alien1.userData.dy*(-1);
			alien2.userData.dx=alien2.userData.dx*(-1);
			alien2.userData.dy=alien2.userData.dy*(-1);
	}
}

function handleAlienNave(nave,alien){
	if((alien.position.x-4.5 <= nave.position.x+10 && alien.position.x+4.5 >= nave.position.x-10) && 
	 	(alien.position.y-1.5 <= nave.position.y+3.5 && alien.position.y+1.5 >= nave.position.y-3.5) ||
	 	((alien.position.y-1.5 <=nave.position.y+7.5 && alien.position.y+1.5 >=nave.position.y-7.5) &&
	 		(alien.position.x-4.5 <= nave.position.x+2 && alien.position.x+4.5>=nave.position.x-2))){
	 		alien.userData.dx=alien.userData.dx*(-1);
	  		alien.userData.dy=alien.userData.dy*(-1);
	  		scene.remove(vidatotal);
	  		vidas--;
	  		createVida(4940,-57,0,vidas);
	}
}
function createVida(x,y,z,n){
	vidatotal=new Vida (x,y,z,n);
	scene.add(vidatotal);
}

function createRandomDirection(alien){
	var t = clock.getDelta();
	dir=Math.random()*Math.PI*2;

	dx=Math.cos(dir);
	dy=Math.sin(dir);
	alien.userData.dx=dx;
	alien.userData.dy=dy;
}

function moveAlien(alien){
	var t = clock.getDelta();
	alien.position.x+=alien.max*alien.userData.dx;
	alien.position.y+=alien.max*alien.userData.dy;

	if(alien.position.x<=-65 || alien.position.x>=65)
		alien.userData.dx=alien.userData.dx*(-1);

	if(alien.position.y<=-50 || alien.position.y>=58)
	alien.userData.dy=alien.userData.dy*(-1);
}

function moveShip(){
	'use strict';

	var t = clock.getDelta();
	if (nave.userData.esquerda==true)
		nave.userData.speed += nave.max*t;


	if (nave.userData.direita==true)
		nave.userData.speed += -nave.max*t;


	nave.position.x+=nave.userData.speed*t;

	if (nave.position.x>=60){
		nave.position.x=60;
		nave.userData.speed=0;
	}

	if (nave.position.x<=-60){
		nave.position.x=-60;
		nave.userData.speed=0;
	}

	if(ncamera==3)
		camera.position.x=nave.position.x;

	if(farol==1)
		atualizaFarol();
	
}

function render(){
	'use strict';
	renderer.autoClear = false;
	renderer.clear();
	renderer.render(scene, camera);
	renderer.clearDepth();
	renderer.render(scene, camera2);

}

//Para que ao redimensionar a janela, a imagem se adapte
function onResize(){
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
	var viewSize=60;
	var aspectRatio=window.innerWidth / window.innerHeight;

	if(ncamera==1){


		if (aspectRatio > 1){
			camera.left = -viewSize*aspectRatio;
			camera.right = viewSize*aspectRatio;
			camera.top = viewSize;
			camera.bottom = -viewSize;
		}
		else{
			camera.left = -viewSize;
			camera.right = viewSize;
			camera.top = viewSize/aspectRatio;
			camera.bottom = -viewSize/aspectRatio;
		}
	}

	else{
		camera.aspect=aspectRatio;
	}

	camera.updateProjectionMatrix();
}

function changeWireframe(){
	'use strict';

	nave.material.wireframe = ! nave.material.wireframe;
	if(objects.length>0){
		objects[0].material.wireframe = ! objects[0].material.wireframe;
	}
	if(shots.length>0){
		shots[0].material.wireframe = ! shots[0].material.wireframe;
	}
	//material.wireframe = !material.wireframe;
	//materialCampo.wireframe = false;
}

function createDirecionalLight(){
	'use strict';
	//ff6600 b3b300
	//branco 0xffffff
	//o que estava 0xff6600

	if(sun==0){
		sol = new THREE.DirectionalLight(0xffffff, 5);
		sol.position.set(40, -50, 100);
    sol.target.position.set( -40, 50, 0 );
    sol.target.updateMatrixWorld();

	  scene.add(sol);
	  dirLightList.push(sol);

    //scene.add( new THREE.DirectionalLightHelper(sol, 0.2) );
	  sun=1;
	}
	else{
		scene.remove(dirLightList[0]);
		dirLightList=[];
		sun=0;
	}
}

function addPointLight(){
	'use strict';
	if(Light == 0){
		var color = 0xffffff; //red
		var intens = 6;
		var dis = 60;
		createPointLight(color, intens, dis, 30,0,50);
		createPointLight(color, intens, dis, 30,30,50);
		createPointLight(color, intens, dis, 30,-30,50);
		createPointLight(color, intens, dis, -30,0,50);
		createPointLight(color, intens, dis, -30,30,50);
		createPointLight(color, intens, dis, -30,-30,50);
		Light=1;
	}


	else{
		//remove os pontosLight anteriores
		Light = 0;
		for(var i=0; i < pointLightList.length; i++){
			scene.remove(pointLightList[i]);
            pointLightList.splice(i, 0);
		}
		pointLightList=[];
	}
}

function createPointLight(color, intens, dis, posX, posY, posZ){
	'use strict';

	redPoint = new THREE.PointLight(color, intens, dis);
    redPoint.position.set( posX, posY, posZ);
    scene.add(redPoint);
    //helper class coloca uma wireframed sphere no local da luz
    //se quiserem que aparaçam descomentem a linha seguinte
    //scene.add(new THREE.PointLightHelper(redPoint, 2));

    pointLightList.push(redPoint);
}

function createFarol(){
	if(farol==0){
		luz = new THREE.SpotLight(0xff0000,10,60,1,0,1);
    	luz.position.set(nave.position.x,nave.position.y,20);
    	luz.target.position.set(nave.position.x,0,0);
    	luz.target.updateMatrixWorld();
    	scene.add(luz);
    	scene.add(luz.target);
    	//scene.add( new THREE.DirectionalLightHelper(luz, 0.2) );
		farol=1;
	}
	else{
		scene.remove(luz);
		scene.remove(luz.target);
		farol=0;
	}
}

function atualizaFarol(){
	luz.position.set(nave.position.x, nave.position.y, 20);
	luz.target.position.set( nave.position.x, 0, 0 );
}


function showPause(){
	
	square = new Pause(0,0,2,30,30,30,1);
	if(squarelist.length==0)
		squarelist.push(square);
	
	scene.add(squarelist[0]);
}

function killPause(){
	scene.remove(squarelist[0]);
	squarelist=[];
}

function showGameOver(){
	if(overlist==0)
		over= new Over(0,0,2,40,40,40,1);
		overlist.push(over);
		scene.add(overlist[0]);
}

function showWin(){
	if(winlist==0){
		win = new Win(0,0,2,40,40,40,1);
		winlist.push(win);
		scene.add(winlist[0]);

	}
}




function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		case 65: //A
		case 97: //a
			changeWireframe();
			break;

		case 37: //Left arrow
			nave.userData.direita=true;
			break;
		case 39: //Right arrow
			nave.userData.esquerda=true;
			break;

		case 49: //1
			createOrthographicCamera();
			break;

		case 50: //2
			createPerspectiveCamera();
			break;
		case 76://L
		case 108://l
			if(bflag==1 && pflag==1){
				var cubematerial=new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x202020, shininess: 30});
				var shipmaterial=new THREE.MeshPhongMaterial({ color: 0x009900, specular: 0x202020, shininess: 30});
				var alienmaterial=new THREE.MeshPhongMaterial({ color: 0x333399, specular: 0x202020, shininess: 30});
				changeMaterial(cubematerial,shipmaterial,alienmaterial);
				bflag=0;
				console.log(bflag, pflag);
				break;
			}

			else if(pflag==0 && bflag==1){
				var cubematerial=new THREE.MeshLambertMaterial({color: 0xffffff});
				var shipmaterial=new THREE.MeshLambertMaterial({color: 0x009900});
				var alienmaterial=new THREE.MeshLambertMaterial({color: 0x33339});

				changeMaterial(cubematerial,shipmaterial,alienmaterial);
				bflag=0;
				console.log(bflag, pflag);
				break;
			}
			else{

				var cubematerial=new THREE.MeshBasicMaterial({ color: 0xffffff});
				var shipmaterial = new THREE.MeshBasicMaterial({ color: 0x009900});
				var alienmaterial = new THREE.MeshBasicMaterial({ color: 0x333399});
				changeMaterial(cubematerial,shipmaterial,alienmaterial);
				bflag=1;
				console.log(bflag, pflag);
				break;
			}
		case 71: //G
		case 103: //g
			if(pflag==0 && bflag==0){
				var cubematerial=new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x202020, shininess: 30});
				var shipmaterial=new THREE.MeshPhongMaterial({ color: 0x009900, specular: 0x202020, shininess: 30});
				var alienmaterial=new THREE.MeshPhongMaterial({ color: 0x333399, specular: 0x202020, shininess: 30});
				changeMaterial(cubematerial,shipmaterial,alienmaterial);
				pflag=1;
				console.log(bflag, pflag);
				break;
			}
			if(pflag==1 & bflag==0){
				var cubematerial=new THREE.MeshLambertMaterial({color: 0xffffff});
				var shipmaterial=new THREE.MeshLambertMaterial({color: 0x009900});
				var alienmaterial=new  THREE.MeshLambertMaterial({color: 0x33339});
				changeMaterial(cubematerial,shipmaterial,alienmaterial);
				pflag=0;
				console.log(bflag, pflag);
				break;
			}
			else{
				break;
			}

		case 78: //N
		case 110: //n
			createDirecionalLight();
			break;

		case 67: //c
		case 99: //c
			addPointLight();
			break;
		case 51: //3
			createPerspectiveCameraMov();
			break;

		case 66: //B
			//createBullet();
			break;
		case 72: //h
			createFarol();
			break;
		case 83: //s
			if(pause==1){
				if(lose==0||won==0){
					pause=0;
					clock.start();
					killPause();
					break;
				}
				break;
			}
			if(pause==0){
				pause=1;
				clock.stop();
				showPause();
				break;
			}
		case 82: //r
			if(lose==1||won==1)
				createScene();
			break;
	}
	render();
}

function onKeyUp(e){
	'use strict';
	switch(e.keyCode){
		case 37:
		case 39:
			nave.userData.esquerda=false;
			nave.userData.direita=false;
			break;
		case 66: //B
		if(pflag==1 && bflag==0 && lose==0 && pause==0){
			var material = new THREE.MeshPhongMaterial({color: 0x007700, specular: 0x202020, shininess: 30});
			createBala(new Bullet(nave.position.x,nave.position.y+7.5,nave.position.z,material),-1);
			break;
		}
		if(pflag==0 && bflag==0 && lose==0 && pause==0){
			var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
			createBala(new Bullet(nave.position.x,nave.position.y+7.5,nave.position.z,material),-1);
			break;
		}
		else if(lose==0 && pause==0){
			var material = new THREE.MeshBasicMaterial({ color: 0x00CC00});
			createBala(new Bullet(nave.position.x,nave.position.y+7.5,nave.position.z,material),-1);
			break;
		}
	}
}

function changeMaterial(cubematerial,shipmaterial,alienmaterial){
	var tempnave = new Ship(nave.position.x,-50,0,shipmaterial);
	tempnave.userData=nave.userData;
	scene.remove(nave);
	createship(tempnave);
	for(i=0;i<objects.length;i++){
		var tempalien=new Alien(objects[i].position.x,objects[i].position.y,objects[i].position.z,alienmaterial);
		tempalien.userData=objects[i].userData;
		scene.remove(objects[i]);
		createalien(tempalien,i);
	}
	for(i=0;i<shots.length;i++){
		var tempshot=shots[i];
		scene.remove(shots[i]);
		var finalshot=new Bullet(tempshot.position.x,tempshot.position.y,0,shipmaterial);
		createBala(finalshot,i);
	}
	//var tempcube= new HelpCube(0,0,-15,cubematerial);
	//scene.remove(Cubojogo);
	//addHelpCube(tempcube);
}

function init(){
	'use strict';

	clock=new THREE.Clock();
	clock.start();

	//renderer=new THREE.WebGLRenderer({ antialias: true });
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	renderer=new THREE.WebGLRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild(renderer.domElement);

	createScene();
	createOrthographicCamera();
	create2ndCamera();

	render();

	//Ativa o evento de redimensionar a janela
	window.addEventListener("resize", onResize);

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}


