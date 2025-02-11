const Applet = imports.ui.applet;
const { St, Pango, GLib } = imports.gi;
const Util = imports.misc.util;

class MicLevelApplet extends Applet.Applet {
   
    constructor(orientation, panel_height, instance_id) {
		global.log('init');
		super(orientation, panel_height, instance_id);

		this._applet_label = new St.Label({ reactive: true,
			track_hover: true,
			style_class: 'applet-label'});

		this._timer_id = null;

        this._applet_label.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;

        this._layoutBin = new St.Bin();
        this._layoutBin.set_child(this._applet_label);

        this.actor.add(this._layoutBin, { y_align: St.Align.MIDDLE,
                                          y_fill: false });
        this.actor.set_label_actor(this._applet_label);
        this.set_applet_tooltip("Microphone Level");
		this._applet_label.set_text("Initializing...");
		this.countdown = 0;

		this.renderMicLevel();
    };

    renderMicLevel() {
		global.log('renderMicLevel');
		this._timer_id = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
			global.log('timer');
			this.countdown++;
			this._applet_label.set_text(this.countdown.toString());
			return GLib.SOURCE_CONTINUE;
		});
    }

    destroy() {
		global.log('destroy');
		if (this._timer_id != null) {
			GLib.Source.remove(this._timer_id);
			this._timer_id = null;
		}
	}

}

function main(metadata, orientation, panel_height, instance_id) {
	global.log('main5');
    return new MicLevelApplet(orientation, panel_height, instance_id);
}



