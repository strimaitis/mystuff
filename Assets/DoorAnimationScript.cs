using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DoorAnimationScript : MonoBehaviour {

	Animator anim;
	BoxCollider coll;

	// Use this for initialization
	void Start () {
		anim = GetComponent<Animator>();
		coll = GetComponent<BoxCollider> ();
	}

	private void OnTriggerEnter(Collider other) {
		anim.SetTrigger("Open_Trigger");
		coll.isTrigger = false;
	}
	
	// Update is called once per frame
	void Update () {
		// OnTriggerEnter (coll);
	}
}