<?php

defined('MOODLE_INTERNAL') || die();

if ($ADMIN->fulltree) {
    $settings->add(new admin_setting_configtext('rkimanage/user_id', get_string('user_id', 'block_rkimanage'), "", null, PARAM_INT));
    $settings->add(new admin_setting_configtext('rkimanage/user_token', get_string('user_token', 'block_rkimanage'), "", null));
}