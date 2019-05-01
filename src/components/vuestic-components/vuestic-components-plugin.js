import Alert from "src/components/vuestic-components/vuestic-alert/VuesticAlert.vue";
import Chart from "src/components/vuestic-components/vuestic-chart/VuesticChart.vue";
import Chat from "src/components/vuestic-components/vuestic-chat/VuesticChat.vue";
import Checkbox from "src/components/vuestic-components/vuestic-checkbox/VuesticCheckbox.vue";
import DataTable from "src/components/vuestic-components/vuestic-datatable/VuesticDataTable.vue";
import DataTablePacijent from "src/components/vuestic-components/vuestic-datatable/VuesticDataTablePacijent.vue";
import Feed from "src/components/vuestic-components/vuestic-feed/VuesticFeed.vue";
import Modal from "src/components/vuestic-components/vuestic-modal/VuesticModal.vue";
import ModalDrS from "src/components/vuestic-components/vuestic-modal/VuesticModalDrugoStanje.vue";
import ModalM from "src/components/vuestic-components/vuestic-modal/VuesticModalMedium.vue";
import ModalS from "src/components/vuestic-components/vuestic-modal/VuesticModalStatic.vue";
import ModalPatient from "src/components/vuestic-components/vuestic-modal/VuesticModalPatient.vue";
import ModalSamplesEntryCommenting from "src/components/vuestic-components/vuestic-modal/VuesticModalSamplesEntryCommenting.vue";
import ModalSamplesEntryCalendar from "src/components/vuestic-components/vuestic-modal/VuesticModalSamplesEntryCalendar.vue";
import ModalBarcode from "src/components/vuestic-components/vuestic-modal/VuesticModalBarcode.vue";
import ModalCommenting from "src/components/vuestic-components/vuestic-modal/VuesticModalCommenting.vue";
import ModalPlus from "src/components/vuestic-components/vuestic-modal/VuesticModalPlus.vue";
import ModalTrash from "src/components/vuestic-components/vuestic-modal/VuesticModalTrash.vue";
import MultiSelect from "src/components/vuestic-components/vuestic-multi-select/VuesticMultiSelect.vue";
import PreLoader from "src/components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue";
import ProfileCard from "src/components/vuestic-components/vuestic-profile-card/VuesticProfileCard.vue";
import ProgressBar from "src/components/vuestic-components/vuestic-progress-bar/VuesticProgressBar.vue";
import Scrollbar from "src/components/vuestic-components/vuestic-scrollbar/VuesticScrollbar.vue";
import SimpleSelect from "src/components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect.vue";
import InputSelect from "src/components/vuestic-components/vuestic-input-select/VuesticInputSelect.vue";
import SocialNews from "src/components/vuestic-components/vuestic-social-news/VuesticSocialNews.vue";
import Switch from "src/components/vuestic-components/vuestic-switch/VuesticSwitch.vue";
import Tabs from "src/components/vuestic-components/vuestic-tabs/VuesticTabs.vue";
import Tag from "src/components/vuestic-components/vuestic-tag/VuesticTag";
import TagGroup from "src/components/vuestic-components/vuestic-tag/VuesticTagGroup";
import Tooltip from "src/components/vuestic-components/vuestic-tooltip/VuesticTooltip.vue";
import Popover from "src/components/vuestic-components/vuestic-popover/VuesticPopover.vue";
import Widget from "src/components/vuestic-components/vuestic-widget/VuesticWidget.vue";
import Wizard from "src/components/vuestic-components/vuestic-wizard/VuesticWizard.vue";
import MediumEditor from "src/components/vuestic-components/vuestic-medium-editor/VuesticMediumEditor.vue";
import VuesticToasted from "src/components/vuestic-mixins/VuesticToasted";
import SiteDropdown from "src/components/vuestic-components/vuestic-site/SiteDropdown.vue";
import Dropdown from "src/components/vuestic-directives/Dropdown";
import DatePicker from "src/components/vuestic-components/vuestic-date-picker/VuesticDatePicker";
import TreeRoot from "src/components/vuestic-components/vuestic-tree-view/VuesticTreeRoot";
import TreeNode from "src/components/vuestic-components/vuestic-tree-view/VuesticTreeNode";
import TreeCategory from "src/components/vuestic-components/vuestic-tree-view/VuesticTreeCategory";
import RadioButton from "src/components/vuestic-components/vuestic-radio-button/VuesticRadioButton.vue";
import VuesticAccordion from "src/components/vuestic-components/vuestic-collapse/VuesticAccordion";
import VuesticCollapse from "src/components/vuestic-components/vuestic-collapse/VuesticCollapse";
import VuesticAccordionPatientInfo from "src/components/vuestic-components/vuestic-collapse/VuesticAccordionPatientInfo";
import VuesticAccordionSamplesEntry from "src/components/vuestic-components/vuestic-collapse/VuesticAccordionSamplesEntry";
import VuesticCollapsePatientInfo from "src/components/vuestic-components/vuestic-collapse/VuesticCollapsePatientInfo";
import VuesticCollapseSamplesEntry from "src/components/vuestic-components/vuestic-collapse/VuesticCollapseSamplesEntry";

// Obrada, Salko Islamović (13.03.2019)
import VuesticAccordionObrada from "src/components/obrada/VuesticAccordionObrada";
import VuesticCollapseObrada from "src/components/obrada/VuesticCollapseObrada";
import VuesticCollapseNalaz from "src/components/obrada/VuesticCollapseNalaz";
import VuesticCollapseUzorak from "src/components/obrada/VuesticCollapseUzorak";
import VuesticModalDelete from "src/components/obrada/VuesticModalDelete";
import VuesticModalEdit from "src/components/obrada/VuesticModalEdit";
import VuesticModalMulti from "src/components/obrada/VuesticModalMulti";
import VuesticModalComment from "src/components/obrada/VuesticModalComment";
import VuesticModalMail from "src/components/obrada/VuesticModalMail";
import VuesticModalFind from "src/components/obrada/VuesticModalFind";
import VuesticModalUzorci from "src/components/obrada/VuesticModalUzorci";
import VuesticModalError from "src/components/obrada/VuesticModalError";
// End of Obrada

const VuesticComponentsPlugin = {
  install(Vue, options) {
    Vue.component(Alert.name, Alert);
    Vue.component(Chart.name, Chart);
    Vue.component(Chat.name, Chat);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(DataTable.name, DataTable);
    Vue.component(DataTablePacijent.name, DataTablePacijent);
    Vue.component(Feed.name, Feed);
    Vue.component(Modal.name, Modal);
    Vue.component(ModalM.name, ModalM);
    Vue.component(ModalPatient.name, ModalPatient);
    Vue.component(
      ModalSamplesEntryCommenting.name,
      ModalSamplesEntryCommenting
    );
    Vue.component(ModalSamplesEntryCalendar.name, ModalSamplesEntryCalendar);
    Vue.component(ModalS.name, ModalS);
    Vue.component(ModalDrS.name, ModalDrS);
    Vue.component(ModalBarcode.name, ModalBarcode);
    Vue.component(ModalCommenting.name, ModalCommenting);
    Vue.component(ModalPlus.name, ModalPlus);
    Vue.component(ModalTrash.name, ModalTrash);
    Vue.component(MultiSelect.name, MultiSelect);
    Vue.component(PreLoader.name, PreLoader);
    Vue.component(ProfileCard.name, ProfileCard);
    Vue.component(ProgressBar.name, ProgressBar);
    Vue.component(Scrollbar.name, Scrollbar);
    Vue.component(SimpleSelect.name, SimpleSelect);
    Vue.component(InputSelect.name, InputSelect);
    Vue.component(SocialNews.name, SocialNews);
    Vue.component(Switch.name, Switch);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Tag.name, Tag);
    Vue.component(TagGroup.name, TagGroup);
    Vue.component(Tooltip.name, Tooltip);
    Vue.component(Popover.name, Popover);
    Vue.component(Widget.name, Widget);
    Vue.component(Wizard.name, Wizard);
    Vue.component(MediumEditor.name, MediumEditor);
    Vue.component(SiteDropdown.name, SiteDropdown);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(TreeRoot.name, TreeRoot);
    Vue.component(TreeNode.name, TreeNode);
    Vue.component(TreeCategory.name, TreeCategory);
    Vue.component(RadioButton.name, RadioButton);
    Vue.component(VuesticAccordion.name, VuesticAccordion);
    Vue.component(
      VuesticAccordionPatientInfo.name,
      VuesticAccordionPatientInfo
    );
    Vue.component(
      VuesticAccordionSamplesEntry.name,
      VuesticAccordionSamplesEntry
    );
    Vue.component(VuesticCollapse.name, VuesticCollapse);
    Vue.component(VuesticCollapsePatientInfo.name, VuesticCollapsePatientInfo);
    Vue.component(
      VuesticCollapseSamplesEntry.name,
      VuesticCollapseSamplesEntry
    );

    // Obrada, Salko Islamović (13.03.2019)
    Vue.component(VuesticAccordionObrada.name, VuesticAccordionObrada);
    Vue.component(VuesticCollapseObrada.name, VuesticCollapseObrada);
    Vue.component(VuesticCollapseNalaz.name, VuesticCollapseNalaz);
    Vue.component(VuesticCollapseUzorak.name, VuesticCollapseUzorak);
    Vue.component(VuesticModalDelete.name, VuesticModalDelete);
    Vue.component(VuesticModalEdit.name, VuesticModalEdit);
    Vue.component(VuesticModalMulti.name, VuesticModalMulti);
    Vue.component(VuesticModalComment.name, VuesticModalComment);
    Vue.component(VuesticModalMail.name, VuesticModalMail);
    Vue.component(VuesticModalFind.name, VuesticModalFind);
    Vue.component(VuesticModalUzorci.name, VuesticModalUzorci);
    Vue.component(VuesticModalError.name, VuesticModalError);
    // End of Obrada

    Vue.mixin(VuesticToasted);
    Vue.directive("dropdown", Dropdown);
  }
};

export default VuesticComponentsPlugin;
