//event listeners.
document.addEventListener('DOMContentLoaded', () => {

    if (typeof fin != 'undefined') {
        fin.desktop.main(onMain);
    } else {
        ofVersion.innerText = 'OpenFin is not available - you are probably running in a browser.';
    }
});

//Once the DOM has loaded and the OpenFin API is ready
function onMain() {
    const app = fin.desktop.Application.getCurrent();
    fin.desktop.System.getVersion(version => {
        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = version;
    });
	fin.desktop.InterApplicationBus.subscribe("*", "timeService", function(message, uuid, name) {
		console.log("The application " + uuid + " sent this message: " + message);
		console.log(message);
		const time = new Date();
		fin.desktop.InterApplicationBus.send(message.uuid, message.subTopic, {
			time: time.toString()
		});		
	});	
}
