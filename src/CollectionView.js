import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import restoreFunction from './utils/restoreFunction';
export default function() {

  restoreFunction('_endBuffering', 'endBuffering', 'endBuffering is now private.', 'CollectionView');
  restoreFunction('_startBuffering', 'startBuffering', 'startBuffering is now private.', 'CollectionView');
  restoreFunction('_showCollection', 'showCollection', 'showCollection is now private.', 'CollectionView');
  restoreFunction('_showEmptyView', 'showEmptyView', 'showEmptyView is now private.', 'CollectionView');
  restoreFunction('_destroyEmptyView', 'destroyEmptyView', 'destroyEmptyView is now private.', 'CollectionView');
  restoreFunction('_checkEmpty', 'checkEmpty', 'checkEmpty is now private.', 'CollectionView');
  restoreFunction('_destroyChildren', 'destroyChildren', 'destroyChildren is now private.', 'CollectionView');
  restoreFunction('_proxyChildEvents', 'proxyChildEvents', 'proxyChildEvents is now private.', 'CollectionView');
  restoreFunction('_addChild', 'addChild', 'addChild is now private.', 'CollectionView');

  const originalConstructor = Marionette.CollectionView.prototype.constructor;

  Marionette.CollectionView = Marionette.CollectionView.extend({
    constructor() {
      Backbone.Events.on.call(this, 'render:children', function() { this.triggerMethod('render:collection', this); });
      Backbone.Events.on.call(this, 'before:render:children', function() { this.triggerMethod('before:render:collection', this); });

      Backbone.Events.on.call(this, 'destroy:children', function() { this.triggerMethod('destroy:collection', this); });
      Backbone.Events.on.call(this, 'before:destroy:children', function() { this.triggerMethod('before:destroy:collection', this); });

      originalConstructor.apply(this, arguments);
    },
    initRenderBuffer() {
      Marionette.deprecate('initRenderBuffer is now private.');
      this._bufferedChildren = [];
    }
  });

  const originalConstructorComp = Marionette.CompositeView.prototype.constructor;

  Marionette.CompositeView = Marionette.CompositeView.extend({
    constructor() {
      Backbone.Events.on.call(this, 'render:children', function() { this.triggerMethod('render:collection', this); });
      Backbone.Events.on.call(this, 'before:render:children', function() { this.triggerMethod('before:render:collection', this); });

      Backbone.Events.on.call(this, 'destroy:children', function() { this.triggerMethod('destroy:collection', this); });
      Backbone.Events.on.call(this, 'before:destroy:children', function() { this.triggerMethod('before:destroy:collection', this); });
      originalConstructorComp.apply(this, arguments);
    }
  });

}

