import { getSessionInfo, loadAllPartials } from '../scripts/helpers.js';
import { get, post, put } from '../scripts/requester.js';


export const teamController = {
    renderTeamInfo: function (ctx) {
        getSessionInfo(ctx);
        const id = ctx.params.id;
        get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => {
                const { name, comment, members, author } = teamInfo;

                ctx.name = name;
                ctx.comment = comment;
                ctx.members = members;
                ctx.teamId = ctx.params.id;

                if (author === ctx.username) {
                    ctx.isAuthor = true;
                }

                if (members.find(x => x.username === ctx.username)) {
                    ctx.isOnTeam = true;
                }

                const partials = loadAllPartials({
                    teamMember: '../templates/catalog/teamMember.hbs',
                    teamControls: '../templates/catalog/teamControls.hbs',
                });

                this.loadPartials(partials)
                    .then(function () {
                        this.partial('../templates/catalog/details.hbs');
                    });
            });
    },

    joinToTeam: function (ctx) {
        getSessionInfo(ctx);

        const id = ctx.params.teamId;

        get('appdata', `teams/${id}`, 'Kinvey')
            .then(teamInfo => {
                teamInfo.members.push({ username: ctx.username });

                put('appdata', `teams/${id}`, teamInfo, 'Kinvey')
                    .then(res => {
                        ctx.redirect(`#/catalog/${id}`);
                    });
            });
    },

    renderCreateTeam: function (ctx) {
        getSessionInfo(ctx);

        const partials = loadAllPartials({ createForm: '../templates/create/createForm.hbs' });

        this.loadPartials(partials)
            .then(function () {
                this.partial('../templates/create/createPage.hbs');
            });
    },

    postCreateTeam: function (ctx) {
        getSessionInfo(ctx);

        const { name, comment } = ctx.params;
        const author = ctx.username;
        const members = [
            { username: ctx.username },
        ];

        post('appdata', 'teams', { name, comment, members, author }, 'Kinvey')
            .then(data => {
                //sessionStorage.setItem("teamId", data._id.slice(1));
                ctx.redirect('#/catalog');
            })
            .catch(console.error);
    },

    renderEditTeam: function (ctx) {
        getSessionInfo(ctx);
        const partials = loadAllPartials({ editForm: '../templates/edit/editForm.hbs' });

        ctx.teamId = ctx.params.teamId;

        this.loadPartials(partials)
            .then(function () {
                this.partial('../templates/edit/editPage.hbs');
            });
    },

    postEditTeam: function (ctx) {
        const { name, comment, teamId } = ctx.params;

        get('appdata', `teams/${teamId}`, 'Kinvey')
            .then(teamInfo => {
                teamInfo.name = name;
                teamInfo.comment = comment;

                put('appdata', `teams/${teamId}`, teamInfo, 'Kinvey')
                    .then(res => {
                        ctx.redirect(`#/catalog/${teamId}`);
                    });
            });

    },

    leaveTeam: function (ctx) {
        getSessionInfo(ctx);
        const { teamId } = ctx.params;

        get('appdata', `teams/${teamId}`, 'Kinvey')
            .then(teamInfo => {
                const { members } = teamInfo;

                teamInfo.members = members.filter(x => x.username !== ctx.username);

                put('appdata', `teams/${teamId}`, teamInfo, 'Kinvey')
                    .then(res => {
                        ctx.redirect(`#/catalog/${teamId}`);
                    });
            });
    },

};
