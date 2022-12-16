'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    

    async getTotal(ctx){
        const id = ctx.params.id;
        const q2 = await strapi.query('result').findOne({ users_permissions_user: id, questioner: 2 });
        const q3 = await strapi.query('result').findOne({ users_permissions_user: id, questioner: 3 });
        const q4 = await strapi.query('result').findOne({ users_permissions_user: id, questioner: 4 });
        const q5 = await strapi.query('result').findOne({ users_permissions_user: id, questioner: 5 });
        
        let total = 0;
        if(q2 && q2.score != null && q2.score > 0){
            total = total + q2.score;
        }
        if(q3 && q3.score != null && q3.score > 0){
            total = total + q3.score;
        }
        if(q4 && q4.score != null && q4.score > 0){
            total = total + q4.score;
        }
        if(q5 && q5.score != null && q5.score > 0){
            total = total + q5.score;
        }
        console.log('masuk ke get total', total);
        return total;
    },

    async calculateRisk(ctx) {

        const id = ctx.params.id;
        // const total = async () => {
        //     return this.getTotal(ctx);
        // }
        let total = await this.getTotal(ctx);
        const profile = await strapi.query('profile').findOne({ user: id });
        console.log('belum masuk', total, profile)
       
        // = q2.score ? q2.score : 0 + q3.score ? q3.score : 0 + q4.score ? q4.score : 0 + q5.score ? q5.score : 0;
        // return total;
        //default color is green
        let color_risk = 'green';

        if (profile) {

            //insert total to user
            
            // entity = await strapi.services.profile.update({ user: id }, {
            //     total_score: total
            // });

           
            // return entity;
            //if non honest, total will * 1.2
            console.log('ini non honest', profile.non_honest, total);
            if (profile.non_honest) {
                
                total = total * 1.2;
                console.log('masuk non honest', total);
            }

            let entity = await strapi.query('profile').update(
                { user: id },
                {
                    total_score: total,
                });

            
            //if have red zone status, will got red
            if (profile.red_zone == true) {
                return 'red';
            }

            //range

            if (profile.consequence > 15 && total < 22) {
                color_risk = 'yellow';
            } else if (profile.consequence > 15 && total >= 22 && total <= 32) {
                color_risk = 'orange';
            } else if (profile.consequence > 15 && total >= 32) {
                color_risk = 'orange';
            } 
            
            if (profile.consequence > 15 && (profile.non_honest || profile.non_masker || profile.non_masker_social)
            ) {
                return 'red';
            }

            if (profile.consequence >= 8 && profile.consequence <= 15 && total < 22) {
                color_risk = 'green';
            } else if (profile.consequence >= 8 && profile.consequence <= 15 && total >= 22 && total <= 32
            ) {
                color_risk = 'yellow';
            } else if (
                profile.consequence >= 8 && profile.consequence <= 15 && total >= 32
            ) {
                color_risk = 'orange';
            } 
            
            if (profile.consequence >= 8 && profile.consequence <= 15 && (profile.non_honest || profile.non_masker || profile.non_masker_social)
            ) {
                return 'red';
            }

            if (profile.consequence >= 1 && profile.consequence <= 7 && total < 22) {
                color_risk = 'green';
            } else if (profile.consequence >= 1 && profile.consequence <= 7 && total >= 22 && total <= 32
            ) {
                color_risk = 'yellow';
            } else if (profile.consequence >= 1 && profile.consequence <= 7 && total >= 32
            ) {
                color_risk = 'yellow';
            } 
            
            if (profile.consequence >= 1 && profile.consequence <= 7 && (profile.non_honest || profile.non_masker || profile.non_masker_social)
            ) {
                color_risk = 'orange';
            }

            if ((profile.consequence == 0 || profile.consequence == null || profile.consequence == '') && total < 22) {
                color_risk = 'green';
            } else if ((profile.consequence == 0 || profile.consequence == null || profile.consequence == '') && total >= 22 && total <= 32) {
                color_risk = 'green';
            } else if ((profile.consequence == 0 || profile.consequence == null || profile.consequence == '') && total >= 32) {
                color_risk = 'green';
            } 
            
            if ((profile.consequence == 0 || profile.consequence == null || profile.consequence == '') && (profile.non_honest || profile.non_masker || profile.non_masker_social)
            ) {
                color_risk = 'yellow';
            }

            return color_risk;
        }

        return color_risk;
    }

};