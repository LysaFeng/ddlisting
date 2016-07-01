// app/components/edit-category.js
import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        // 编辑分类
        editCategory() {
            var projId = Ember.$("#projId1").val();
            var projName = Ember.$("#projNameId1").val();
            if (projId) {
                this.store.findRecord('project', projId).then((proj) => {
                  proj.set('projName', projName);
                  proj.save();
                });
                Ember.$("#editCategoryId").modal('toggle');
            }
        },
        // TODO 暂时不直接删除，只是设置为删除状态
        delCategory() {
            // 获取删除数据的id
            var id = Ember.$("#projId1").val();
            //  首先删除与此项目关联的所有TODO
            this.store.findRecord('project', id).then((proj) => {
                // var userId = sessionStorage.getItem("__LOGIN_USER_ID__");
                proj.get('todoItems').forEach(function(item) {
                    item.set('recordStatus', 3);
                    item.save();
                });
                // this.store.peekAll("todo-item").filter((td) => {
                //     //
                //     if (td.get('userid') === userId && (td.get('recordstatus') === 1 || td.get('recordstatus') === 2)) {
                //         //  设置为删除状态
                //         td.set('recordstatus', 3);
                //         td.save();
                //     }
                // });
                // 删除分类
                // proj.destroyRecord();
                // proj.deleteRecord();
                // proj.get('isDeleted'); // => true
                // proj.save(); // => DELETE to /posts/1
                // 修改状态，并不直接删除
                proj.set('projStatus', 2);
                proj.save();
            });

            //  关闭modal弹出窗口
            Ember.$('#editCategoryId').modal('toggle');
        }
    }
});