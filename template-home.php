<?php
/*
 * Template Name: Home Page
 * Description: A Home Page Template with a HERO section.
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['popup_widgets'] = Timber::get_widgets('popup_widgets');
Timber::render( array( 'template-home.twig' ), $context );