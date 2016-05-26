import Ember from 'ember';

export default Ember.Route.extend({
    
    //  根据左侧选择的类型过滤数据
    model: function(params) {

        var project = params.category_id;
        if (!Ember.computed.empty(project)) {
            project = "myTodos";
        }

        var retArr = [];
        this.store.query('todo-item', {}).then(function(td) {
        	//debugger;
		  	td.forEach(function(item, index) {
		  		if (item.get('project') === project)
		  			retArr.pushObject(item);
		  	});
		});

		return retArr;
    }

});
