<?php

class block_rkimanage extends block_base
{
    public function init()
    {
        $this->title = get_string('rkimanage', 'block_rkimanage');
    }

    public function get_content()
    {
        global $CFG;
        if ($this->content !== null) {
            return $this->content;
        }

        $style = file_get_contents($CFG->dirroot . "/blocks/rkimanage/style/rkimanage.css");
        $js = file_get_contents($CFG->dirroot . "/blocks/rkimanage/js/rkimanage.js");
        $mainPage = file_get_contents($CFG->dirroot . "/blocks/rkimanage/templates/rendermainpage.mustache");

        $this->content = new stdClass;
        $this->content->text .= "<style>" . $style . "</style>";
        $this->content->text .= "<script src=\"https://code.jquery.com/jquery-1.9.1.min.js\"></script>";
        $this->content->text .= $mainPage;
        $this->content->text .= "<script type=\"text/javascript\"> " . $js . " </script>";

        return $this->content;
    }

    public function hide_header()
    {
        return true;
    }

    function has_config()
    {
        return true;
    }

}
