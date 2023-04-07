let launchesLoaded = 0;
const launchesPerLoad = 10;

function showLoadingIndicator(show) {
    const loader = document.querySelector('.loader');
    if (show) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
}

function displayLaunchData() {
    showLoadingIndicator(true);
    fetch(`https://api.spacexdata.com/v5/launches`)
        .then((response) => response.json())
        .then((data) => {
            const launchDataDiv = document.getElementById("launchData");
            const noDataMessage = document.getElementById("noDataMessage");
            let launchDataHTML = "";
            if (data.length === 0) {
                launchDataDiv.style.display = "none";
                noDataMessage.style.display = "block";
            } else {
                launchDataDiv.style.display = "block";
                noDataMessage.style.display = "none";
                data.slice(0, 10).forEach((launch) => {
                    launchDataHTML += `
                    <div class="card mb-3 shadow-lg rounded-3">
                        <div class="row g-0">
                            <div class="col-2">
                                <img src="" class="img-thumbnail" alt="...">
                            </div>
                            <div class="col-10">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">Mission Name: ${launch.name} (${launch.date_utc})</h5>
                                    Details: ${launch.details}
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
                launchDataDiv.innerHTML = launchDataHTML;
            }
            showLoadingIndicator(false);
        })
        .catch((error) => {
            console.error(error);
            showLoadingIndicator(false);
        });
}

window.onload = () => {
    displayLaunchData();
};