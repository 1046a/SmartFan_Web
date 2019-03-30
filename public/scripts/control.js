function setButtons(id) {
    $('.speed.button').addClass('basic');
    $('.speed.button').eq(id).removeClass('basic');
}

function updateSpeed(id) {
    fetch("/rpm", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rpm: id
        })
    }).then(response => {
        return response.json();
    }).then(status => {
        updateStatus(status);
    }).catch(err => {
        console.error(err);
    })
}

function updateStatus(status) {
    if (status.power !== undefined) {
        if (status.power) {
            $('#fan-power').checkbox('set checked');
            $('#seg-child').dimmer('hide');
        } else {
            $('#fan-power').checkbox('set unchecked');
            $('#seg-child').dimmer('show');
        }
    }
    if (status.mode !== undefined) {
        console.log(status.mode.toString());
        $('#fan-mode').dropdown('set selected', status.mode.toString());
    }
    if (status.rpm !== undefined) {
        setButtons(status.rpm);
    }
}

$('#fan-power').checkbox({
    onChange: function() {
        var checked = $('#fan-power').checkbox('is checked');
        console.log(`power changed: ${checked}`);

        if (checked) {
            $('#seg-child').dimmer('hide');
        } else {
            $('#seg-child').dimmer('show');
        }
        fetch("/power", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                power: (checked ? 1 : 0)
            })
        }).then(response => {
            var status = response.json();
            updateStatus(status);
        }).catch(err => {
            console.error(err);
        });
    }
});

$(document).ready(function() {
    $('#fan-mode').dropdown({
        action: function(text, value) {
            console.log(`mode changed: ${value}`);
            fetch("/mode", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mode: value
                })
            }).then(response => {
                return response.json();
            }).then(status => {
                updateStatus(status);
            }).catch(err => {
                console.error(err);
            })
            $(this).dropdown('hide');
        }
    });

    $('#seg-child').dimmer({
        closable: false
    });

    fetch('/status').then(response => {
        console.log("status got!!");
        return response.json();
    }).then(status => {
        updateStatus(status);
    }).catch(err => {
        console.error(err);
    });

    $('#fan-speed-low').on('click', function() {
        setButtons(0);
        updateSpeed(0);
    });
    $('#fan-speed-med').on('click', function() {
        setButtons(1);
        updateSpeed(1);
    });
    $('#fan-speed-high').on('click', function() {
        setButtons(2);
        updateSpeed(2);
    });
});

