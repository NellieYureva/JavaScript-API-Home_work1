const workoutsInfo = [
    {
        id: "1",
        title: "Аква аэробика",
        time: "11:00 - 12:00",
        maxParticipants: "10",
        recordedParticipants: "3"
    },
    {
        id: "2",
        title: "Круговая тренировка",
        time: "18:00 - 19:00",
        maxParticipants: "10",
        recordedParticipants: "5"
    },
    {
        id: "3",
        title: "Пилатес",
        time: "19:00 - 20:00",
        maxParticipants: "10",
        recordedParticipants: "9"
    }
            
];

function renderWorkoutSchedule(workoutsInfo) {
    const scheduleBox = document.querySelector('.schedule-box');

    workoutsInfo.forEach(item => {
        scheduleBox.insertAdjacentHTML('beforeend', `
            <div class="schedule_item-box" id="${item.title}">
                <div class="schedule_item">
                <p class="schedule_item-title">${item.title}</p>
                <p class="schedule_item-time">${item.time}</p>
                <p class="schedule_item-maxnumber">Максимальное количество участников: <span>${item.maxParticipants}</span></p>
                <p data-id=${item.id} class="schedule_item-currentnumber">Текущее количество записанных участников: <span>${item.recordedParticipants}</span></p>
                <div class="button-box">
                    <button class="button-submit" id="${item.id}">Записаться</button>
                    <button class="button-reject disabled" data-id="${item.title}">Отменить запись</button>
                </div>
            </div>
        `);
        if (Number(item.maxParticipants) === Number(item.recordedParticipants)) {
            const submitButton = document.getElementById(`${item.id}`);
            submitButton.classList.add('disabled');
        }
    });
}
renderWorkoutSchedule(workoutsInfo);

const scheduleBox = document.querySelector('.schedule-box');

scheduleBox.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-submit')) {
        workoutsInfo[e.target.id - 1].recordedParticipants = Number(workoutsInfo[e.target.id - 1].recordedParticipants) + 1;
        const recordedParticipantsNow = document.querySelector(`[data-id="${e.target.id}"]`);
        const span = recordedParticipantsNow.querySelector('span');
        span.textContent = workoutsInfo[e.target.id - 1].recordedParticipants;

        const currentSubmitButton = document.getElementById(`${e.target.id}`);
        currentSubmitButton.classList.add('disabled');
        currentSubmitButton.nextElementSibling.classList.remove('disabled');
    }
    if (e.target.classList.contains('button-reject')) {
        console.log(workoutsInfo);
        let currentWorkoutsInfoItem = workoutsInfo.filter(item => item.title === e.target.dataset.id);
        let index = Number(currentWorkoutsInfoItem[0].id) - 1;
        workoutsInfo[index].recordedParticipants = workoutsInfo[index].recordedParticipants - 1;

        const currentNumberOfParticipants = document.querySelector(`[data-id="${index + 1}"]`);
        const span = currentNumberOfParticipants.querySelector('span');
        span.textContent = workoutsInfo[index].recordedParticipants;

        const currentRejectButton = document.querySelector(`[data-id="${e.target.dataset.id}"]`);
        currentRejectButton.classList.add('disabled');
        currentRejectButton.previousElementSibling.classList.remove('disabled');
    }
});
    