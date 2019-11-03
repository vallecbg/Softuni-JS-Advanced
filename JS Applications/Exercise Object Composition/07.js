function bugTracker() {
    let bugReports = [];
    let bugId = 0;
    let selector = undefined;

    function report(author, description, reproducible, severity) {
        let report = {
            ID: bugId++,
            author: author,
            description: description,
            reproducible: reproducible,
            severity: severity,
            status: 'Open'
        };
        bugReports.push(report);
        updateHTML();
    }

    function setStatus(id, newStatus) {
        bugReports.filter(x => x.ID == id)[0].status = newStatus;
        console.log(bugReports);
        updateHTML();
    }

    function remove(id) {
        bugReports = bugReports.filter(x => x.ID != id);
        updateHTML();
    }

    function sort(method) {
        switch (method) {
            case 'author':
                bugReports = bugReports.sort((a, b) => a.author.localeCompare(b.author));
                break;
            case 'severity':
                bugReports = bugReports.sort((a, b) => a.severity - b.severity);
                break;
            default: // ID
                bugReports = bugReports.sort((a, b) => a.ID - b.ID);
                break;
        }
        updateHTML();
    }

    function output(sel) {
        selector = sel;
    }

    function updateHTML() {
        if (selector) {
            let container = $(selector).html(''); // NB!
            for (let report of bugReports) {
                let reportHTML =
                    $('<div>').attr('id', 'report_' + report.ID).addClass('report')
                        .append($('<div>').addClass('body').append($('<p>').text(report.description)))
                        .append($('<div>')
                            .addClass('title')
                            .append($('<span>').addClass('author').text('Submitted by: ' + report.author))
                            .append($('<span>').addClass('status').text(report.status + ' | ' + report.severity)));
                container.append(reportHTML);
            }
        }
    }

    return {report, setStatus, remove, sort, output};
}