/** @jsx React.DOM */

(function () {

	var navItems = [
		{ fragment: "files", iconName: "files-o", name: "Files" }
	];

	Drop.Views.AppNav = React.createClass({
		displayName: 'Drop.Views.AppNav',

		getInitialState: function () {
			return {
				navItems: navItems,
				activeFragment: null,
				menuActive: false
			};
		},

		handleMenuToggleClick: function (e) {
			e.preventDefault();
			this.setState({ menuActive: !this.state.menuActive });
		},

		render: function () {
			var AppNavItem = Drop.Views.AppNavItem;
			var navItems = this.state.navItems.map(function (item) {
				return <AppNavItem key={item.fragment} fragment={item.fragment} active={item.fragment === this.state.activeFragment} iconName={item.iconName} name={item.name} />;
			}.bind(this));
			return (
				<div>
					<a className="menu-switch js-menu-switch" onClick={this.handleMenuToggleClick}>Menu</a>
					<ul className={"unstyled app-nav-list"+ (this.state.menuActive ? ' show' : '')}>
						{navItems}
					</ul>
				</div>
			);
		}
	});

	Drop.Views.AppNavItem = React.createClass({
		fragmentPath: function (fragment) {
			return Drop.Helpers.fullPath('/' + fragment);
		},

		handleClick: function (e) {
			e.preventDefault();
			if (this.props.authenticated) {
				Marbles.history.navigate(this.props.fragment, { trigger: true });
			}
		},

		render: function () {
			return (
				<a className={(this.props.active ? 'active' : '') + (this.props.authenticated ? '' : ' disabled') } href={this.fragmentPath(this.props.fragment)} onClick={this.handleClick}>
					<li>
						<i className={"fa fa-" + this.props.iconName}></i>{this.props.name}
					</li>
				</a>
			);
		}
	});

})();
