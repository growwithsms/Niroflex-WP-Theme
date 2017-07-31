<?php
/*
 * Template Name: About Page
 * Description: An About Page Template with a timeline section.
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['popup_widgets'] = Timber::get_widgets('popup_widgets');
$context['footer_widgets'] = Timber::get_widgets('footer_widgets');
Timber::render( array( 'template-about.twig' ), $context );