<?php
/*
 * Template Name: Landing Page
 * Description: A Landing Page Template for collecting leads.
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['popup_widgets'] = Timber::get_widgets('popup_widgets');
$context['footer_widgets'] = Timber::get_widgets('footer_widgets');
Timber::render( array( 'template-landing.twig' ), $context );