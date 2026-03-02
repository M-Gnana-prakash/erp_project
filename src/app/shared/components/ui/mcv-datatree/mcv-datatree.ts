import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface McvDatatreeNode {
    id: string;
    label: string;
    url?: string;
    expanded?: boolean;
    isEditing?: boolean;
    children?: McvDatatreeNode[];
}

@Component({
    selector: 'app-mcv-datatree',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './mcv-datatree.html',
    styleUrl: './mcv-datatree.css'
})
export class McvDatatree {
    @Input() data: McvDatatreeNode[] = [];
    @Input() title: string = 'Data Tree';
    @Input() readOnly: boolean = false;

    // RBAC Inputs
    @Input() canAdd: boolean = true;
    @Input() canEdit: boolean = true;
    @Input() canDelete: boolean = true;
    @Input() canExpandCollapse: boolean = true;

    @Output() onAdd = new EventEmitter<McvDatatreeNode>();
    @Output() onDelete = new EventEmitter<McvDatatreeNode>();
    @Output() onUpdate = new EventEmitter<McvDatatreeNode>();
    @Output() onNodeClick = new EventEmitter<McvDatatreeNode>();

    toggleNode(node: McvDatatreeNode) {
        node.expanded = !node.expanded;
    }

    startEditing(node: McvDatatreeNode, event: MouseEvent) {
        if (this.readOnly || !this.canEdit) return;
        event.stopPropagation();
        node.isEditing = true;
    }

    stopEditing(node: McvDatatreeNode) {
        node.isEditing = false;
        this.onUpdate.emit(node);
    }

    expandAll() {
        this.setAllExpanded(this.data, true);
    }

    collapseAll() {
        this.setAllExpanded(this.data, false);
    }

    private setAllExpanded(nodes: McvDatatreeNode[], state: boolean) {
        nodes.forEach(node => {
            node.expanded = state;
            if (node.children) {
                this.setAllExpanded(node.children, state);
            }
        });
    }

    moveLastToBeginning() {
        if (this.readOnly || !this.canEdit) return;
        if (this.data.length > 1) {
            const last = this.data.pop();
            if (last) {
                this.data.unshift(last);
            }
        }
    }

    addNode(parentNode?: McvDatatreeNode) {
        if (this.readOnly || !this.canAdd) return;
        const newNode: McvDatatreeNode = {
            id: Math.random().toString(36).substring(2, 11),
            label: parentNode ? `${parentNode.label}.${(parentNode.children?.length || 0) + 1}` : `node${this.data.length + 1}`,
            expanded: true,
            children: []
        };

        if (parentNode) {
            if (!parentNode.children) parentNode.children = [];
            parentNode.children.push(newNode);
            parentNode.expanded = true;
        } else {
            this.data.push(newNode);
        }
        this.onAdd.emit(newNode);
    }

    deleteNode(node: McvDatatreeNode) {
        if (this.readOnly || !this.canDelete) return;
        this.data = this.removeNodeById(this.data, node.id);
        this.onDelete.emit(node);
    }

    openLink(node: McvDatatreeNode, event: MouseEvent) {
        event.stopPropagation();
        if (node.url) {
            window.open(node.url, '_blank');
        }
    }

    private removeNodeById(nodes: McvDatatreeNode[], id: string): McvDatatreeNode[] {
        return nodes.filter(node => {
            if (node.id === id) return false;
            if (node.children) {
                node.children = this.removeNodeById(node.children, id);
            }
            return true;
        });
    }
}
