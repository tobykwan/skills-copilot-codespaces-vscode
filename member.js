function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var projects = document.getElementById("projects");
    var contact = document.getElementById("contact");
    var about = document.getElementById("about");
    var skillsMember = document.getElementById("skillsMember");
    var projectsMember = document.getElementById("projectsMember");
    var contactMember = document.getElementById("contactMember");
    var aboutMember = document.getElementById("aboutMember");
    if (member.style.display === "none") {
        member.style.display = "block";
        skills.style.display = "none";
        projects.style.display = "none";
        contact.style.display = "none";
        about.style.display = "none";
        skillsMember.style.display = "none";
        projectsMember.style.display = "none";
        contactMember.style.display = "none";
        aboutMember.style.display = "none";
    } else {
        member.style.display = "none";
        skills.style.display = "none";
        projects.style.display = "none";
        contact.style.display = "none";
        about.style.display = "none";
        skillsMember.style.display = "none";
        projectsMember.style.display = "none";
        contactMember.style.display = "none";
        aboutMember.style.display = "none";
    }
}
