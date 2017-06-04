<?php

/*
 *
 * Widgets and Sidebars
 *
 */

// Register your widgets and sidebars here.
register_sidebar( array(
	'name'          => 'Popup Widgets',
	'id'            => 'popup_widgets',
	'before_widget' => '<div class="popup-widget">',
	'after_widget'  => '</div>',
	'before_title'  => '<h4>',
	'after_title'   => '</h4>',
) );
