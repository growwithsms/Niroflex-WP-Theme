<?php
/*
 * Template Name: Resources
 * Description: A Resource Page Template for linking to various downloadable resources.
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['popup_widgets'] = Timber::get_widgets('popup_widgets');
Timber::render( array( 'template-resources.twig' ), $context );